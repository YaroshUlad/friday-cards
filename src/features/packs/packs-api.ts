import { instance } from 'api/config/apiConfig';

export const packsAPI = {
  fetchPacks(URLParams: FetchPacksParamsType) {
    return instance.get<FetchPacksResponseType>('cards/pack', {
      params: {
        user_id: URLParams.user_id,
        packName: URLParams.packName,
        min: URLParams.min,
        max: URLParams.max,
        sortPacks: URLParams.sortPacks,
        page: URLParams.page,
        pageCount: URLParams.pageCount,
      },
    });
  },

  createPack(packName: string, isPrivate: boolean, deckCover?: string) {
    return instance.post('cards/pack', {
      cardsPack: {
        name: packName,
        deckCover, // адресс обложки колоды ( url or base64)
        private: isPrivate,
      },
    });
  },

  deletePack(packId: string) {
    return instance.delete(`cards/pack?id=${packId}`);
  },

  updatePack(packId: string, newPackName: string, deckCover?: string) {
    return instance.put('cards/pack', {
      cardsPack: {
        _id: packId,
        name: newPackName,
        deckCover,
      },
    });
  },
};

export type FetchPacksParamsType = {
  user_id?: string;
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
};

export type CardPackType = {
  _id: string; // CardPack id (id колоды карточек)
  user_id: string; // (id юзера создавшего колоду)
  user_name: string; // имя юзера создавшего колоду
  name: string; // имя колоды
  grade: number; // оценка колоды
  shots: number; // количество проголосовавших
  updated: '2022-07-30T18:23:57.858Z';
  deckCover: null | string; // путь к обложке колоды
  cardsCount: number; // количество вопросов
  // "path": string  // хз что это
  // "private": boolean  // приватна ли колода Видна ли остальным юзерам
  // "type": "pack",
  // "rating": 0,
  // "created": "2022-07-30T17:56:21.656Z",
  // "more_id": "62dfe5868cf0b21258ba4d48",
  // "__v": 0,
};

export type FetchPacksResponseType = {
  cardPacks: CardPackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
};
