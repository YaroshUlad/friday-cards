import React from 'react';

import DialogContent from '@mui/material/DialogContent';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const ModalBody = (props: ModalBodyPropsType): ReturnComponentType => {
  const { children } = props;
  return <DialogContent dividers>{children}</DialogContent>;
};

type ModalBodyPropsType = {
  children: React.ReactNode;
};
