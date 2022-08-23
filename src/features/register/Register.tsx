import React from 'react';

import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/store';
import { FormWrapper } from 'common/components/formWrapper/FormWrapper';
import { RoutePath } from 'common/enums/route-path';
import { RegisterForm } from 'features/register/registerForm/RegisterForm';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Register = React.memo((): ReturnComponentType => {
  const isRegister = useAppSelector(state => state.register.isRegister);

  const navigate = useNavigate();
  const handleClickCancelRegister = (): void => navigate(RoutePath.Login);

  if (isRegister) {
    return <Navigate to={RoutePath.Login} />;
  }

  return (
    <FormWrapper>
      <h2>It-incubator</h2>
      <h3>SingUp</h3>
      <RegisterForm />
      <p>Already have an account?</p>
      <Button onClick={handleClickCancelRegister}>Sing In</Button>
    </FormWrapper>
  );
});
