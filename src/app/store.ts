import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppActionsType, appReducer } from 'app/app-reducer';
import { CardsActionsType, cardsReducer } from 'features/cards/cards-reducer';
import { ForgotActionsType, forgotReducer } from 'features/forgotPassword/forgot-reducer';
import { loginReducer, LoginReducerActionsType } from 'features/login/login-reducer';
import { PacksActionType, packsReducer } from 'features/packs/packs-reducer';
import {
  registerReducer,
  RegisterReducerActionsType,
} from 'features/register/register-reducer';

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  register: registerReducer,
  forgot: forgotReducer,
  packs: packsReducer,
  packCards: cardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  RootActionsType // AppRootActionsType
>;
type RootActionsType =
  | PacksActionType
  | AppActionsType
  | ForgotActionsType
  | LoginReducerActionsType
  | RegisterReducerActionsType
  | CardsActionsType;

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// @ts-ignore
window.state = store.getState();
