import React from 'react';

import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from 'app/store';
import { setSearchValueAC } from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const SearchArea = React.memo((): ReturnComponentType => {
  const searchValue = useAppSelector(state => state.packs.searchValue);

  const dispatch = useAppDispatch();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    dispatch(setSearchValueAC(e.currentTarget.value));
  };

  return (
    <div className={styles.filterAreaBlock}>
      <div>Search</div>
      <TextField
        size="small"
        value={searchValue}
        onChange={handleOnChange}
        sx={{ width: '463px', marginTop: '8px' }}
        style={{ padding: '0' }}
        id="outlined-search"
        placeholder="Search field"
        type="search"
      />
    </div>
  );
});
