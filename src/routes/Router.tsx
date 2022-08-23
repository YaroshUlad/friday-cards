import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { NaviForDev } from 'common/components/_NAVI_FOR_DEV/NAVI_FOR_DEV';
import Error404 from 'common/components/error404/Error404';
import { AddNewPackModal } from 'common/components/modal/addNewPackModal/AddNewPackModal';
import { RoutePath } from 'common/enums/route-path';
import { Cards } from 'features/cards/Cards';
import { CheckEmail } from 'features/forgotPassword/CheckEmail';
import { CreateNewPassword } from 'features/forgotPassword/CreateNewPassword';
import { ForgotPassword } from 'features/forgotPassword/ForgotPassword';
import { LearningCard } from 'features/learn/LearningCard';
import { Login } from 'features/login/Login';
import { Packs } from 'features/packs/Packs';
import { Profile } from 'features/profile/Profile';
import { Register } from 'features/register/Register';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { RoutesType } from 'types/RoutesType';

export const Router = (): ReturnComponentType => {
  const routesArray: RoutesType[] = [
    { path: RoutePath.Profile, component: <Profile /> },
    { path: RoutePath.Login, component: <Login /> },
    { path: RoutePath.Error404, component: <Error404 /> },
    { path: RoutePath.Register, component: <Register /> },
    { path: RoutePath.ForgotPassword, component: <ForgotPassword /> },
    { path: RoutePath.CheckEmail, component: <CheckEmail /> },
    { path: RoutePath.CreateNewPassword, component: <CreateNewPassword /> },
    { path: RoutePath.ForgotPassword, component: <ForgotPassword /> },
    { path: RoutePath.Packs, component: <Packs /> },
    { path: RoutePath.Cards, component: <Cards /> },
    { path: RoutePath.CardLearning, component: <LearningCard /> },
    { path: '/modalTest', component: <AddNewPackModal /> },
  ];

  return (
    <>
      <NaviForDev />
      <Routes>
        {routesArray.map(item => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
        <Route path="/" element={<Navigate to={RoutePath.Login} />} />
        <Route path="/Card" element={<Navigate to={RoutePath.Login} />} />
        <Route path="*" element={<Navigate to={RoutePath.Error404} />} />
        <Route path={RoutePath.Error404} element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Router;
