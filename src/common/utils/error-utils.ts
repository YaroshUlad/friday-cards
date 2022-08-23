import { Dispatch } from 'redux';

import { AppActionsType, setAppSnackbarAC, setAppStatusAC } from 'app/app-reducer';

export const handleServerNetworkError = (
  error: string | undefined,
  dispatch: Dispatch<ReturnType<typeof setAppSnackbarAC> | AppActionsType>,
): void => {
  dispatch(setAppSnackbarAC('error', error || 'Some error occurred'));
  dispatch(setAppStatusAC('failed'));
};
