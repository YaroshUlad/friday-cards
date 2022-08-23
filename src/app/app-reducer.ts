import { Dispatch } from 'redux';

import { handleServerNetworkError } from 'common/utils/error-utils';
import { loginAPI } from 'features/login/login-api';
import { logInAC, setUserInfo } from 'features/login/login-reducer';

const initialState: InitialStateType = {
  status: 'idle' as RequestStatusType,
  alertColor: 'success' as AlertColorType,
  snackbarMessage: '',
  isInit: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-SNACKBAR':
      return {
        ...state,
        alertColor: action.alertColor,
        snackbarMessage: action.snackbarMessage,
      };
    case 'APP/SET-INITIALIZATION':
      return { ...state, isInit: action.status };
    default:
      return { ...state };
  }
};
export const setAppStatusAC = (status: RequestStatusType) =>
  ({
    type: 'APP/SET-STATUS',
    status,
  } as const);

export const setAppSnackbarAC = (alertColor: AlertColorType, message: string) =>
  ({
    type: 'APP/SET-SNACKBAR',
    alertColor,
    snackbarMessage: message,
  } as const);
export const setInitialization = (status: boolean) =>
  ({
    type: 'APP/SET-INITIALIZATION',
    status,
  } as const);

// _____________________ Thunks _________________

export const me = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  loginAPI
    .me()
    .then(res => {
      dispatch(logInAC());
      dispatch(setUserInfo(res.data));
      dispatch(setAppSnackbarAC('info', 'You are authorized'));
    })
    .catch(res => {
      handleServerNetworkError(res.response.data.error, dispatch);
    })
    .finally(() => {
      dispatch(setInitialization(true));
      dispatch(setAppStatusAC('idle'));
    });
};

export type AppActionsType =
  | ReturnType<typeof setAppSnackbarAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setInitialization>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AlertColorType = 'success' | 'error' | 'info' | 'warning';
export type InitialStateType = {
  status: RequestStatusType;
  alertColor: AlertColorType;
  snackbarMessage: string;
  isInit: boolean;
};
