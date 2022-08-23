import React from 'react';

import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from 'app/store';
import { PasswordWithVisibility } from 'common/components/passwordWithVisibility/PasswordWithVisibility';
import { registerSchema } from 'common/validation/formValidation';
import { register } from 'features/register/register-reducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const RegisterForm = React.memo((): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const appStatus = useAppSelector(state => state.app.status);

  const registerForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(register(values.email, values.password));
      resetForm();
    },
  });

  const checkButtonStatus =
    appStatus === 'loading' ||
    !!registerForm.errors.email ||
    !!registerForm.errors.password;

  return (
    <form onSubmit={registerForm.handleSubmit}>
      <FormControl>
        <FormGroup>
          <TextField
            label="Email"
            margin="normal"
            variant="standard"
            error={registerForm.touched.email && Boolean(registerForm.errors.email)}
            helperText={registerForm.touched.email && registerForm.errors.email}
            {...registerForm.getFieldProps('email')}
          />

          <PasswordWithVisibility
            error={registerForm.touched.password && Boolean(registerForm.errors.password)}
            helperText={registerForm.touched.password && registerForm.errors.password}
            formikFieldProps={registerForm.getFieldProps('password')}
          />

          <PasswordWithVisibility
            error={
              registerForm.touched.confirmPassword &&
              Boolean(registerForm.errors.confirmPassword)
            }
            helperText={
              registerForm.touched.confirmPassword && registerForm.errors.confirmPassword
            }
            formikFieldProps={registerForm.getFieldProps('confirmPassword')}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={checkButtonStatus}
          >
            Register
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
});
