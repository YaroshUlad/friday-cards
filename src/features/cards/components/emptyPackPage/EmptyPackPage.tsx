import React from 'react';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { CreateUpdateCardModal } from 'common/components/modal/createUpdateCardModal/CreateUpdateCardModal';
import { CreateUpdateCardPayloadType } from 'features/cards/Cards';

type PropsType = {
  addNewCard: (payload: CreateUpdateCardPayloadType) => void;
};
export const EmptyPackPage = ({ addNewCard }: PropsType): React.ReactElement => (
  <Box
    style={{
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Typography style={{ margin: '30px' }}>
      This page is empty. Click to add new card to fill this pack
    </Typography>
    <CreateUpdateCardModal
      createUpdateCard={addNewCard}
      formTitle="add"
      questionImg=""
      question=""
      answer=""
    />
  </Box>
);
