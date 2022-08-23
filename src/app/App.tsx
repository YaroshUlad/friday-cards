import React, { useEffect } from 'react';

import './App.css';

import { CircularProgress, LinearProgress } from '@mui/material';

import { me } from './app-reducer';
import { useAppDispatch, useAppSelector } from './store';

import { SimpleSnackbar } from 'common/components/simpleSnackbar/SimpleSnackbar';
import Router from 'routes/Router';
import { ReturnComponentType } from 'types/ReturnComponentType';

const App = (): ReturnComponentType => {
  const status = useAppSelector(state => state.app.status);
  const isInit = useAppSelector(state => state.app.isInit);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  if (!isInit) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="App">
      {status === 'loading' && (
        <div style={{ position: 'fixed', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      )}
      <Router />
      <SimpleSnackbar />
    </div>
  );
};

export default App;
