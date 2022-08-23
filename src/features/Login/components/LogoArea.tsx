import React from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  title: string;
};

export const LogoArea = (props: PropsType): ReturnComponentType => {
  const { title } = props;
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>logo will be here</Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </>
  );
};
