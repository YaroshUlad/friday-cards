import React from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useAppDispatch, useAppSelector } from 'app/store';
import { setIsOnlyMyPacksAC } from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const MyAllPacksArea = React.memo((): ReturnComponentType => {
  const isOnlyMyPacks = useAppSelector(state => state.packs.isOnlyMyPacks);

  const dispatch = useAppDispatch();

  const fetchMyCardsPack = (): void => {
    dispatch(setIsOnlyMyPacksAC(true));
  };

  const fetchAllCardsPack = (): void => {
    dispatch(setIsOnlyMyPacksAC(false));
  };

  const variant = isOnlyMyPacks ? 'contained' : 'outlined';
  const variant2 = !isOnlyMyPacks ? 'contained' : 'outlined';

  return (
    <div className={styles.filterAreaBlock}>
      <div>Show packs cards </div>
      <ButtonGroup aria-label="outlined button group">
        <Button
          variant={variant}
          onClick={fetchMyCardsPack}
          sx={{ width: '98px', height: '39,98px', marginTop: '8px' }}
        >
          My
        </Button>
        <Button
          variant={variant2}
          onClick={fetchAllCardsPack}
          sx={{ width: '98px', height: '39,98px', marginTop: '8px' }}
        >
          All
        </Button>
      </ButtonGroup>
    </div>
  );
});
