import React, { useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import useDebounce from 'common/hooks/useDebounce';
import {
  createPackCardTC,
  getPackCardsTC,
  setCardsPageCountNumberAC,
  setCardsPageNumberAC,
} from 'features/cards/cards-reducer';
import { CardsSearchArea } from 'features/cards/components/cardsSearchArea/CardsSearchArea';
import { CardsTableArea } from 'features/cards/components/cardsTableArea/CardsTableArea';
import { CardsTitleArea } from 'features/cards/components/cardsTitleArea/CardsTitleArea';
import { EmptyPackPage } from 'features/cards/components/emptyPackPage/EmptyPackPage';
import { Pagination } from 'features/packs/components/Pagination/Pagination';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export type CreateUpdateCardPayloadType = {
  question?: string;
  questionImg?: string;
  answer: string;
};

export const Cards = React.memo((): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(state => state.packCards.cards);
  const page = useAppSelector(state => state.packCards.page);
  const pageCount = useAppSelector(state => state.packCards.pageCount);
  const totalCount = useAppSelector(state => state.packCards.cardsTotalCount);
  const searchValue = useAppSelector(state => state.packCards.searchValue);
  const sortFlag = useAppSelector(state => state.packCards.sortFlag);
  const sortChoice = useAppSelector(state => state.packCards.sortChoice);
  const { packId } = useParams<'packId'>() as { packId: string };
  const empty = 0;

  const handleAddNewCard = useCallback((payload: CreateUpdateCardPayloadType): void => {
    dispatch(
      createPackCardTC({
        cardsPack_id: packId,
        answer: payload.answer,
        questionImg: payload.questionImg,
        question: payload.question,
      }),
    );
  }, []);
  const delay = 1000;
  const debouncedValue = useDebounce<string | undefined>(searchValue, delay);

  const changePage = useCallback((value: number): void => {
    //  dispatch Action for Changing page number
    dispatch(setCardsPageNumberAC(value));
  }, []);
  const changePageCount = useCallback((value: number): void => {
    //  dispatch Action forChanging pageCount value
    dispatch(setCardsPageCountNumberAC(value));
  }, []);

  const sortOne = 1;
  const sortZero = 0;

  useEffect(() => {
    const sortCards = `${sortFlag ? sortOne : sortZero}${sortChoice}`;
    dispatch(
      getPackCardsTC({
        cardsPack_id: packId,
        cardQuestion: debouncedValue,
        page,
        pageCount,
        sortCards,
      }),
    );
  }, [page, pageCount, debouncedValue, sortFlag, sortChoice]);

  return (
    <div className={styles.packsWrapper}>
      <CardsTitleArea addNewCard={handleAddNewCard} packId={packId} />
      <CardsSearchArea />
      {cards.length === empty ? (
        <EmptyPackPage addNewCard={handleAddNewCard} />
      ) : (
        <CardsTableArea cards={cards} />
      )}
      <Pagination
        page={page}
        pageCount={pageCount}
        totalCount={totalCount}
        changePage={changePage}
        changePageCount={changePageCount}
      />
    </div>
  );
});
