import React from 'react';

import { useAppDispatch } from 'app/store';
import { CreateUpdateCardModal } from 'common/components/modal/createUpdateCardModal/CreateUpdateCardModal';
import { DeleteCardModal } from 'common/components/modal/deleteCardModal/DeleteCardModal';
import { CreateUpdateCardPayloadType } from 'features/cards/Cards';
import { updatePackCardTC } from 'features/cards/cards-reducer';

type ActionsPropsType = {
  packId: string;
  cardId: string;
  answer: string;
  question: string;
  questionImg: string;
};

export const CardActions = React.memo((props: ActionsPropsType): React.ReactElement => {
  const { packId, cardId, questionImg, question, answer } = props;
  const dispatch = useAppDispatch();

  const updateCard = (payload: CreateUpdateCardPayloadType): void => {
    dispatch(
      updatePackCardTC({
        packId,
        _id: cardId,
        questionImg: payload.questionImg,
        question: payload.question,
        answer: payload.answer,
      }),
    );
  };

  return (
    <div style={{ display: 'flex', marginLeft: '20px', alignItems: 'center' }}>
      <CreateUpdateCardModal
        createUpdateCard={updateCard}
        formTitle="edit"
        questionImg={questionImg}
        question={question}
        answer={answer}
      />
      <DeleteCardModal cardId={cardId} packId={packId} />
    </div>
  );
});
