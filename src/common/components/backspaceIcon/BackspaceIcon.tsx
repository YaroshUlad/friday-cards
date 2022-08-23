import React from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from 'common/enums/route-path';

export const BackspaceButton = (): React.ReactElement => {
  const navigate = useNavigate();
  const onClickHandler = (): void => {
    navigate(RoutePath.Packs);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button onClick={onClickHandler} color="inherit">
        <KeyboardBackspaceIcon />
        <Typography style={{ padding: '15px' }}>Back to Packs List</Typography>
      </Button>
    </div>
  );
};
