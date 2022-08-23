import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// import { setAppSnackbarAC } from 'app/app-reducer';
import { AppRootStateType } from 'app/store';
import { fetchCardPacks } from 'features/packs/packs-reducer';

export const sortZero = 0;
export const sortOne = 1;

export const handleFetchPacks = (
  dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>,
  state: AppRootStateType,
  message: string,
): void => {
  const { packs, login } = state;
  const { isOnlyMyPacks, page, pageCount, sortFlag, sortChoice } = packs;
  const { _id } = login.userInfo;
  const sortPacks = `${sortFlag ? sortOne : sortZero}${sortChoice}`;
  const userId = isOnlyMyPacks ? _id : '';
  const params = { page, pageCount, sortPacks, user_id: userId };
  console.log(message);
  // dispatch(setAppSnackbarAC('success', message)); // check what is status text
  dispatch(fetchCardPacks(params));
};
