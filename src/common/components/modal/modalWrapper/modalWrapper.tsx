import React from 'react';

import Dialog from '@mui/material/Dialog';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const ModalWrapper = (props: ModalWrapperPropsType): ReturnComponentType => {
  const { handleClose, open, children } = props;

  return (
    <Dialog onClose={handleClose} open={open}>
      {children}
    </Dialog>
  );
};

type ModalWrapperPropsType = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};
