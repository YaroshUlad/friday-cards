import React, { SyntheticEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { useAppDispatch, useAppSelector } from 'app/store';
import { setMinMaxFilterValueAC } from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const NumberOfCardsFilterArea = React.memo((): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const min = useAppSelector(state => state.packs.min);
  const max = useAppSelector(state => state.packs.max);

  const [values, setValues] = useState<number[]>([min, max]);

  const index0 = 0;
  const index1 = 1;

  const handleChange = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[],
  ): void => {
    if (Array.isArray(value)) {
      dispatch(setMinMaxFilterValueAC(value[index0], value[index1]));
    }
  };

  return (
    <div className={styles.filterAreaBlock}>
      <div>Number of cards</div>
      <Box sx={{ width: 250 }}>
        <Slider
          getAriaLabel={() => 'Packs count range'}
          value={values}
          min={minCardsCount}
          max={maxCardsCount}
          onChange={(e, val) => {
            if (Array.isArray(val)) {
              setValues(val);
            }
          }}
          onChangeCommitted={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
});
