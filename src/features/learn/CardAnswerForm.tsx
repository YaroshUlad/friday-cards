import React, { useState } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import { CardsType } from 'features/cards/cards-api';
import { updateCardGradeTC } from 'features/cards/cards-reducer';
import { getRandomCard } from 'features/learn/LearningCard';

const grades: GradeType[] = [
  { value: 1, label: 'Did not know' },
  { value: 2, label: 'Forgot' },
  { value: 3, label: 'A lot of thought' },
  { value: 4, label: 'Confused' },
  { value: 5, label: 'Knew the answer' },
];

type GradeType = { value: number; label: string };

type PropsType = {
  card: CardsType;
  setCard: (card: CardsType) => void;
  setShowAnswer: (value: boolean) => void;
};

export const CardAnswerForm = ({
  setCard,
  setShowAnswer,
  card,
}: PropsType): React.ReactElement => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(state => state.packCards.cards);
  const { packId } = useParams() as { packId: string };

  const startValue = 0;

  const [grade, setGrade] = useState<number>(startValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setGrade(+(event.target as HTMLInputElement).value);
  };
  const onCLickNextCardHandler = (): void => {
    if (packId) {
      dispatch(updateCardGradeTC(grade, card._id));
      setShowAnswer(false);
      setCard(getRandomCard(cards));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <b>Answer: </b>
        <span>{card.answer}</span>
      </div>
      <FormControl>
        <FormLabel>Rate yourself:</FormLabel>
        <RadioGroup value={grade} onChange={handleChange}>
          {grades.map(gr => (
            <FormControlLabel
              key={gr.value}
              control={<Radio />}
              value={gr.value}
              label={gr.label}
            />
          ))}
        </RadioGroup>
        <Button
          variant="contained"
          disabled={grade === startValue}
          onClick={onCLickNextCardHandler}
        >
          Next
        </Button>
      </FormControl>
    </div>
  );
};
