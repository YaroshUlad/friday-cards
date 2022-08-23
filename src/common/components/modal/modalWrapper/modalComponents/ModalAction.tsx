import React from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const ModalAction = (props: ModalActionType): ReturnComponentType => {
  const { buttonColor, buttonAction, onCancel } = props;

  return (
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button autoFocus color={buttonColor} onClick={buttonAction}>
        {buttonColor === 'success' ? 'Save' : 'Delete'}
      </Button>
    </DialogActions>
  );
};

type ModalActionType = {
  onCancel: () => void;
  buttonAction: () => void;
  buttonColor: 'success' | 'error';
};
