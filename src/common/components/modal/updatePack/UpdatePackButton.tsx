import React, { ReactElement } from 'react';

import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export const UpdatePackButton = ({ setIsOpen }: PropsType): ReactElement => (
  <IconButton onClick={setIsOpen}>
    <Edit />
  </IconButton>
);

type PropsType = {
  setIsOpen: () => void;
};
