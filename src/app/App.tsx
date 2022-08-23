import React, { useEffect } from 'react';

import './App.css';

import { CircularProgress, LinearProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { me } from './app-reducer';
import { useAppDispatch, useAppSelector } from './store';

import { SimpleSnackbar } from 'common/components/simpleSnackbar/SimpleSnackbar';
import { RoutePath } from 'common/enums/route-path';
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
      <div style={{ height: '60px' }}>
        <NavLink to={RoutePath.Error404}>404 </NavLink>-
        <NavLink to={RoutePath.Profile}> Profile </NavLink>-
        <NavLink to={RoutePath.Login}> Login </NavLink>-
        <NavLink to={RoutePath.Register}> Register </NavLink>-
        <NavLink to={RoutePath.ForgotPassword}> ForgotPassword </NavLink>-
        <NavLink to={RoutePath.CheckEmail}> CheckEmail </NavLink>-
        <NavLink to={RoutePath.CreateNewPassword}>CreateNewPassword </NavLink>-
        <NavLink to={RoutePath.Packs}>Packs </NavLink>-
        <NavLink to="modalTest">modal </NavLink>-
      </div>
    </div>
  );
};

export default App;
