import React from 'react';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import { PasswordWithVisibility } from 'common/components/passwordWithVisibility/PasswordWithVisibility';
import { createNewPasswordSchema } from 'common/validation/formValidation';
import { createNewPassword } from 'features/forgotPassword/forgot-reducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CreateNewPasswordForm = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const url = useLocation();
  const tokenIndex = 2;
  const token = url.pathname.split('/')[tokenIndex];

  const appStatus = useAppSelector(state => state.app.status);

  const createNewPasswordForm = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: createNewPasswordSchema,
    onSubmit: () => {
      dispatch(createNewPassword(createNewPasswordForm.values.password, token));
      createNewPasswordForm.resetForm();
    },
  });

  const checkButtonStatus =
    appStatus === 'loading' || !!createNewPasswordForm.errors.password;

  return (
    <form onSubmit={createNewPasswordForm.handleSubmit}>
      <FormControl>
        <PasswordWithVisibility
          error={
            createNewPasswordForm.touched.password &&
            Boolean(createNewPasswordForm.errors.password)
          }
          helperText={
            createNewPasswordForm.touched.password &&
            createNewPasswordForm.errors.password
          }
          formikFieldProps={createNewPasswordForm.getFieldProps('password')}
        />

        <p>Create new password and we will send you further instructions to email</p>

        <Button disabled={checkButtonStatus} type="submit" variant="contained">
          Create new password
        </Button>
      </FormControl>
    </form>
  );
};
