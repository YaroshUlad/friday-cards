import React from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import { NotFound } from './features/404NotFound/404NotFound';
import { Login } from './features/Login/Login';
import {Registration} from "./features/Registration/Registration";
import {NewPasswordEntry} from "./features/Password/NewPasswordEntry/NewPasswordEntry";
import {PasswordRecovery} from "./features/Password/PasswordRecovery/PasswordRecovery";
import {Profile} from "./features/Profile/Profile";
import {TestPage} from "./features/TestPage/TestPage";

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path={'/404'} element={<NotFound />}/>
         <Route path={'/login'} element={<Login />}/>
         <Route path={'/profile'} element={<Profile />}/>
         <Route path={'/registration'} element={<Registration />}/>
         <Route path={'/newPasswordEntry'} element={<NewPasswordEntry />}/>
         <Route path={'/passwordRecovery'} element={<PasswordRecovery />}/>
         <Route path={'/testPage'} element={<TestPage />}/>
      </Routes>
    </div>
  );
}

export default App;
