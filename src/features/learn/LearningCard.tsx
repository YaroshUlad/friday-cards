import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import { BackspaceButton } from 'common/components/backspaceIcon/BackspaceIcon';
import { FormWrapper } from 'common/components/formWrapper/FormWrapper';
import { CardsType } from 'features/cards/cards-api';
import { getPackCardsTC } from 'features/cards/cards-reducer';
import { CardAnswerForm } from 'features/learn/CardAnswerForm';

export const getRandomCard = (cards: CardsType[]): CardsType => {
  const maxVal = 6;
  const nul = 0;
  const one = 1;
  const sum = cards.reduce(
    (acc, card) => acc + (maxVal - card.grade) * (maxVal - card.grade),
    nul,
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (maxVal - card.grade) * (maxVal - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );
  return cards[res.id + one];
};

export const LearningCard = (): React.ReactElement => {
  const cards = useAppSelector(state => state.packCards.cards);
  const packs = useAppSelector(state => state.packs.cardPacks);

  const { packId } = useParams() as { packId: string };
  const dispatch = useAppDispatch();

  const currentPack = packs.find(p => p._id === packId);
  const packName = currentPack!.name;

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState(true);
  const [card, setCard] = useState<CardsType>({} as CardsType);

  const onCLickAnswerHandler = (): void => {
    setShowAnswer(true);
  };
  useEffect(() => {
    if (firstRender) {
      dispatch(
        getPackCardsTC({ cardsPack_id: packId, pageCount: currentPack!.cardsCount }),
      );
      setFirstRender(false);
    }
    if (cards.length) {
      setCard(getRandomCard(cards));
    }
  }, [dispatch, cards, packId, firstRender]);

  return (
    <div>
      <BackspaceButton />
      <FormWrapper>
        <h2>Learn `{packName}`</h2>
        <div style={{ margin: '20px' }}>
          <b>Question: </b>
          <span>{card.question}</span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Box color="gray">number of attempts to answer the question: {card.shots}</Box>
        </div>
        <Button variant="contained" onClick={onCLickAnswerHandler}>
          Show answer
        </Button>
        <div style={{ margin: '20px' }}>
          {showAnswer && (
            <CardAnswerForm card={card} setCard={setCard} setShowAnswer={setShowAnswer} />
          )}
        </div>
      </FormWrapper>
    </div>
  );
};
