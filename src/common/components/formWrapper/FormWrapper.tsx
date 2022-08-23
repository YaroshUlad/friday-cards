import React from 'react';

import { Paper } from '@mui/material';

import style from 'common/components/formWrapper/FormWrapper.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const FormWrapper = React.memo(
  (props: PropsType): ReturnComponentType => (
    <Paper className={style.paper} elevation={12}>
      {props.children}
    </Paper>
  ),
);

type PropsType = {
  children: React.ReactNode;
};
