import { AxiosError } from 'axios';

import { setAppStatusAC } from 'app/app-reducer';
import { AppThunk } from 'app/store';
import { handleServerNetworkError } from 'common/utils/error-utils';
import { handleFetchPacks } from 'common/utils/refetchPacks-utills';
import {
  FetchPacksParamsType,
  FetchPacksResponseType,
  packsAPI,
} from 'features/packs/packs-api';

const initialState: InitialStateType = {
  cardPacks: [],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 1,
  minCardsCount: 0,
  maxCardsCount: 1000,
  min: 0,
  max: 1000,
  isOnlyMyPacks: false,
  searchValue: '',
  sortFlag: false,
  sortChoice: 'updated',
};
type InitialStateType = FetchPacksResponseType & {
  isOnlyMyPacks: boolean;
  searchValue: string;
  min: number;
  max: number;
  sortFlag: boolean;
  sortChoice: 'cardsCount' | 'updated' | 'name';
};

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionType,
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-IS-ONLY-MY-PACKS':
      return {
        ...state,
        isOnlyMyPacks: action.flag,
      };
    case 'packs/SET-SORT-FLAG':
      return {
        ...state,
        sortFlag: !state.sortFlag,
      };
    case 'packs/SET-SEARCH-VALUE':
    case 'packs/SET-MIN-MAX-FILTER-VALUES':
    case 'packs/SET-MIN-MAX-CARDS-COUNTS-VALUES':
    case 'packs/SET-CARD-PACKS':
    case 'packs/SET-PAGE-NUMBER':
    case 'packs/SET-PAGE-COUNT-NUMBER':
    case 'packs/SET-CHOICE-FLAG':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// __________________Actions_____________________

const setCardPacksAC = (payload: FetchPacksResponseType) =>
  ({
    type: 'packs/SET-CARD-PACKS',
    payload,
  } as const);

export const setSearchValueAC = (value: string) =>
  ({
    type: 'packs/SET-SEARCH-VALUE',
    payload: {
      searchValue: value,
    },
  } as const);
export const setIsOnlyMyPacksAC = (flag: boolean) =>
  ({
    type: 'packs/SET-IS-ONLY-MY-PACKS',
    flag,
  } as const);

export const setMinMaxCardsCountAC = (minCardsCount: number, maxCardsCount: number) =>
  ({
    type: 'packs/SET-MIN-MAX-CARDS-COUNTS-VALUES',
    payload: {
      minCardsCount,
      maxCardsCount,
    },
  } as const);

export const setMinMaxFilterValueAC = (min: number, max: number) =>
  ({
    type: 'packs/SET-MIN-MAX-FILTER-VALUES',
    payload: {
      min,
      max,
    },
  } as const);

export const setSortFlagAC = () =>
  ({
    type: 'packs/SET-SORT-FLAG',
  } as const);

export const setSortChoiceAC = (sortChoice: 'cardsCount' | 'updated' | 'name') =>
  ({
    type: 'packs/SET-CHOICE-FLAG',
    payload: {
      sortChoice,
    },
  } as const);

export const setPageNumber = (page: number) =>
  ({
    type: 'packs/SET-PAGE-NUMBER',
    payload: {
      page,
    },
  } as const);

export const setPageCountNumber = (pageCount: number) =>
  ({
    type: 'packs/SET-PAGE-COUNT-NUMBER',
    payload: {
      pageCount,
    },
  } as const);
// ___________________Thunks_____________________

export const fetchCardPacks =
  (params: FetchPacksParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'));
      const res = await packsAPI.fetchPacks(params);
      dispatch(setCardPacksAC(res.data));
      dispatch(setAppStatusAC('succeeded'));
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(error.message, dispatch);
    } finally {
      dispatch(setAppStatusAC('idle'));
    }
  };

export const createNewPack =
  (packName: string, isPrivate: boolean, deckCover?: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatusAC('loading'));
      const res = await packsAPI.createPack(packName, isPrivate, deckCover);
      handleFetchPacks(dispatch, getState(), res.statusText);
    } catch (e) {
      const error = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(error.message, dispatch);
    } finally {
      dispatch(setAppStatusAC('idle'));
    }
  };
export const deletePack =
  (packId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatusAC('loading'));
      const res = await packsAPI.deletePack(packId);
      handleFetchPacks(dispatch, getState(), res.statusText);
    } catch (e) {
      const error = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(error.message, dispatch);
    } finally {
      dispatch(setAppStatusAC('idle'));
    }
  };

export const updatePack =
  (packId: string, newPackName: string, deckCover?: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatusAC('loading'));
      const res = await packsAPI.updatePack(packId, newPackName, deckCover);
      handleFetchPacks(dispatch, getState(), res.statusText);
    } catch (e) {
      const error = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(error.message, dispatch);
    } finally {
      dispatch(setAppStatusAC('idle'));
    }
  };

// __________________Types_______________________

export type PacksActionType =
  | SetSortFlagAT
  | SetMinMaxCardsCountAT
  | SetCardPacksAT
  | SetSearchValueAT
  | SetIsOnlyMyPacksAT
  | SetMinMaxFilterValueAT
  | SetPageCountNumberAT
  | SetPageNumberAT
  | SetSortChoiceAT;

type SetCardPacksAT = ReturnType<typeof setCardPacksAC>;
type SetSearchValueAT = ReturnType<typeof setSearchValueAC>;
type SetIsOnlyMyPacksAT = ReturnType<typeof setIsOnlyMyPacksAC>;
type SetMinMaxFilterValueAT = ReturnType<typeof setMinMaxFilterValueAC>;
type SetMinMaxCardsCountAT = ReturnType<typeof setMinMaxCardsCountAC>;
type SetSortFlagAT = ReturnType<typeof setSortFlagAC>;
type SetSortChoiceAT = ReturnType<typeof setSortChoiceAC>;
type SetPageNumberAT = ReturnType<typeof setPageNumber>;
type SetPageCountNumberAT = ReturnType<typeof setPageCountNumber>;
