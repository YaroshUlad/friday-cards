import React from 'react';

import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from 'app/store';
import { setCardsSearchValueAC } from 'features/cards/cards-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsSearchArea = React.memo((): ReturnComponentType => {
  const searchValue = useAppSelector(state => state.packCards.searchValue);

  const dispatch = useAppDispatch();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    dispatch(setCardsSearchValueAC(e.currentTarget.value));
  };

  return (
    <div className={styles.filterAreaBlock}>
      <div>Search</div>
      <TextField
        size="small"
        value={searchValue}
        onChange={handleOnChange}
        sx={{ width: '100%', marginTop: '8px', marginBottom: '20px' }}
        style={{ padding: '0' }}
        id="outlined-search"
        placeholder="Search field"
        type="search"
      />
    </div>
  );
});
