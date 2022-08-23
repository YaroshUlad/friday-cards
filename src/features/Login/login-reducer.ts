import { Dispatch } from 'redux';

import { setAppSnackbarAC, setAppStatusAC } from 'app/app-reducer';
import { handleServerNetworkError } from 'common/utils/error-utils';
import { loginAPI } from 'features/login/login-api';

const initialState: InitialStateType = {
  isLoggedIn: false,
  userInfo: {
    name: '',
    avatar: '',
    _id: '',
  },
};

type InitialStateType = {
  isLoggedIn: boolean;
  userInfo: UserInfoType;
};

export const loginReducer = (
  state: InitialStateType = initialState,
  action: LoginReducerActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'login-reducer/LOGIN':
      return { ...state, isLoggedIn: action.newStatus };
    case 'login-reducer/LOGOUT':
      return { ...state, isLoggedIn: action.newStatus };
    case 'login/SET-USER-INFO':
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
    default:
      return state;
  }
};

//  Action Creators

export const logInAC = () =>
  ({
    type: 'login-reducer/LOGIN',
    newStatus: true,
  } as const);
export const logOutAC = () =>
  ({
    type: 'login-reducer/LOGOUT',
    newStatus: false,
  } as const);
export const setUserInfo = (payload: UserInfoType) =>
  ({
    type: 'login/SET-USER-INFO',
    payload,
  } as const);

export type UserInfoType = {
  name?: string;
  email?: string;
  avatar?: string;
  _id: string;
};

// Thunks

export const logIn =
  (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    loginAPI
      .login({ email, password, rememberMe })
      .then(res => {
        dispatch(logInAC());
        dispatch(setAppStatusAC('succeeded'));
        dispatch(
          setUserInfo({
            email: res.data.email,
            name: res.data.name,
            avatar: res.data.avatar,
            // eslint-disable-next-line
            _id: res.data._id,
          }),
        );
      })
      .catch(err => {
        handleServerNetworkError(err.response.data.error || err.message, dispatch);
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'));
      });
  };

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  loginAPI
    .logout()
    .then(res => {
      dispatch(logOutAC());
      dispatch(setAppSnackbarAC('success', res.data.info));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(err => {
      handleServerNetworkError(err.message, dispatch);
    })
    .finally(() => {
      dispatch(setAppStatusAC('idle'));
    });
};

export const updateUserInfoTC = (data: UserInfoType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  loginAPI
    .updateUserInfo({ name: data.name, avatar: data.avatar })
    .then(() => {
      dispatch(setUserInfo({ ...data }));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(err => {
      handleServerNetworkError(err.message, dispatch);
    })
    .finally(() => {
      dispatch(setAppStatusAC('idle'));
    });
};

// Types

export type LoginReducerActionsType = LoginAT | LogoutAT | SetUserInfoAT;
type LoginAT = ReturnType<typeof logInAC>;
type LogoutAT = ReturnType<typeof logOutAC>;
type SetUserInfoAT = ReturnType<typeof setUserInfo>;
