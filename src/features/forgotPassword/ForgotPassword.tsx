import React from 'react';

import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

import { ForgotPasswordForm } from './forgotPasswordForm/forgotPasswordForm';

import { useAppSelector } from 'app/store';
import { FormWrapper } from 'common/components/formWrapper/FormWrapper';
import { RoutePath } from 'common/enums/route-path';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const ForgotPassword = (): ReturnComponentType => {
  const email = useAppSelector(state => state.forgot.email);

  const navigate = useNavigate();
  const handleClickCancelRegister = (): void => navigate(RoutePath.Login);

  if (email) {
    return <Navigate to={RoutePath.CheckEmail} />;
  }

  return (
    <FormWrapper>
      <h2>It-incubator</h2>
      <h3>Forgot your password ?</h3>
      <ForgotPasswordForm />
      <h4>Did you remember your password?</h4>
      <Button onClick={handleClickCancelRegister}>Try logging in</Button>
    </FormWrapper>
  );
};
