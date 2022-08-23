import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import { HeaderRow } from 'features/packs/components/TableArea/components/HeaderRow';
import { Row } from 'features/packs/components/TableArea/components/Row';
import { CardPackType } from 'features/packs/packs-api';

type TableAreaPropsType = {
  packs: CardPackType[];
};

export const TableArea = React.memo((props: TableAreaPropsType): React.ReactElement => {
  const { packs } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '700px' }} aria-label="customized table">
        <TableHead>
          <HeaderRow />
        </TableHead>
        <TableBody>
          {packs.map(el => (
            <Row key={el._id} item={el} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
