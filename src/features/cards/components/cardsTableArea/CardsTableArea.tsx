import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import { CardsType } from 'features/cards/cards-api';
import { CardHeaderRow } from 'features/cards/components/cardsTableArea/components/CardHeaderRow';
import { CardRow } from 'features/cards/components/cardsTableArea/components/CardRow';

type CardsTableAreaPropsType = {
  cards: CardsType[];
};

export const CardsTableArea = React.memo(
  ({ cards }: CardsTableAreaPropsType): React.ReactElement => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <CardHeaderRow />
        </TableHead>
        <TableBody>
          {cards.map(el => (
            <CardRow key={el._id} item={el} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
);
