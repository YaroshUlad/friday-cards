import { instance } from 'api/config/apiConfig';

export const cardsAPI = {
  getCards(URLParams: GetCardsParamsType) {
    return instance.get<GetCardsResponseType>('cards/card', {
      params: { ...URLParams },
    });
  },
  createCard(params: CreateCardParamsType) {
    return instance.post('cards/card', {
      card: { ...params },
    });
  },
  deleteCard(cardId: string) {
    return instance.delete(`cards/card?id=${cardId}`);
  },
  updateCard(updateCardParams: UpdateCardParamsType) {
    return instance.put(`cards/card`, {
      card: { ...updateCardParams },
    });
  },
  updateCardGrade(data: GradeCardParamsType) {
    return instance.put(`cards/grade`, data);
  },
};

// ________________________Types____________________________
export type GetCardsParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
export type CreateCardParamsType = {
  cardsPack_id: string;
  question?: string; // если не отправить будет таким
  answer?: string; // если не отправить будет таким
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};
export type GetCardsResponseType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};
export type CardsType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
  questionImg: string;
};
export type UpdateCardParamsType = {
  _id: string;
  question?: string;
  answer?: string;
  questionImg?: string;
};
export type GradeCardParamsType = { grade: number; card_id: string };
