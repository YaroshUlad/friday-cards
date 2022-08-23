import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type ItemsNumberSelectProps = {
  pageCount: number;
  changePageCount: (value: number) => void;
};

export const ItemsNumberSelect = React.memo((props: ItemsNumberSelectProps) => {
  const { pageCount, changePageCount } = props;

  return (
    <Select
      value={pageCount.toString()}
      size="small"
      defaultValue="6"
      onChange={(e: SelectChangeEvent) => {
        changePageCount(+e.target.value);
      }}
    >
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={8}>8</MenuItem>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={12}>12</MenuItem>
    </Select>
  );
});
