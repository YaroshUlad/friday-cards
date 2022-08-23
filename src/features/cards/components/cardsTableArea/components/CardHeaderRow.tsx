import React from 'react';

import { ArrowDropDownOutlined, ArrowDropUpOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useAppDispatch, useAppSelector } from 'app/store';
import { setCardsSortChoiceAC, setCardsSortFlagAC } from 'features/cards/cards-reducer';
import styles from 'features/packs/components/TableArea/components/HeaderRow.module.css';

export const CardHeaderRow = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const sortFlag = useAppSelector(state => state.packCards.sortFlag);
  const sortChoice = useAppSelector(state => state.packCards.sortChoice);

  const sortChoiceHandler = (sortChoicer: 'updated' | 'question' | 'grade'): void => {
    dispatch(setCardsSortChoiceAC(sortChoicer));
  };

  const sort = (): void => {
    dispatch(setCardsSortFlagAC());
  };

  return (
    <TableRow sx={{ bgcolor: '#EFEFEF' }}>
      <TableCell
        style={{ minWidth: 235 }}
        className={styles.clickable}
        onClick={() => sortChoiceHandler('question')}
      >
        Question{'  '}
        {sortChoice === 'question' && (
          <IconButton onClick={sort} color="primary">
            {sortFlag ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
          </IconButton>
        )}
      </TableCell>
      <TableCell style={{ minWidth: 235 }}>Answer</TableCell>
      <TableCell
        style={{ minWidth: 130 }}
        className={styles.clickable}
        onClick={() => sortChoiceHandler('updated')}
      >
        Last Updated{'  '}
        {sortChoice === 'updated' && (
          <IconButton onClick={sort} color="primary">
            {sortFlag ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
          </IconButton>
        )}
      </TableCell>
      <TableCell
        style={{ minWidth: 100 }}
        className={styles.clickable}
        onClick={() => sortChoiceHandler('grade')}
      >
        Grade{'  '}
        {sortChoice === 'grade' && (
          <IconButton onClick={sort} color="primary">
            {sortFlag ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};
