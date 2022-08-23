import React, { ReactElement } from 'react';

import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export const DeletePackButton = ({ setIsOpen }: PropsType): ReactElement => (
  <IconButton onClick={setIsOpen}>
    <Delete />
  </IconButton>
);

type PropsType = {
  setIsOpen: () => void;
};
