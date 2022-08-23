import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';

export const AddNewPackButton = ({ setIsOpen }: PropsType): ReactElement => (
  <Button variant="contained" onClick={setIsOpen}>
    Add new Pack
  </Button>
);

type PropsType = {
  setIsOpen: () => void;
};
