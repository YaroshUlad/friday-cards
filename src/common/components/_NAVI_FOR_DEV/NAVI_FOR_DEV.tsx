import React from 'react';

import { AppBar, Toolbar } from '@mui/material';

import { AppTitle } from 'common/components/_NAVI_FOR_DEV/components/AppTitle';
import { IconMenu } from 'common/components/_NAVI_FOR_DEV/components/IconMenu';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const NaviForDev = (): ReturnComponentType => (
  <div>
    <AppBar style={{ background: '#fff' }} position="static">
      <Toolbar style={{ justifyContent: 'space-around' }}>
        <AppTitle />
        <IconMenu />
      </Toolbar>
    </AppBar>
  </div>
);
