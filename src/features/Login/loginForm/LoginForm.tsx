import React from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { logIn } from '../login-reducer';

import { useAppDispatch, useAppSelector } from 'app/store';
import { PasswordWithVisibility } from 'common/components/passwordWithVisibility/PasswordWithVisibility';
import { RoutePath } from 'common/enums/route-path';
import { loginSchema } from 'common/validation/formValidation';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const LoginForm = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const appStatus = useAppSelector(state => state.app.status);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      dispatch(
        logIn(
          loginForm.values.email,
          loginForm.values.password,
          loginForm.values.rememberMe,
        ),
      );
      loginForm.resetForm();
    },
  });

  const checkButtonStatus =
    appStatus === 'loading' || !!loginForm.errors.email || !!loginForm.errors.password;

  return (
    <div>
      <form onSubmit={loginForm.handleSubmit}>
        <FormControl>
          <TextField
            label="Email"
            margin="normal"
            variant="standard"
            error={loginForm.touched.email && Boolean(loginForm.errors.email)}
            helperText={loginForm.touched.email && loginForm.errors.email}
            {...loginForm.getFieldProps('email')}
          />
          <PasswordWithVisibility
            error={loginForm.touched.password && Boolean(loginForm.errors.password)}
            helperText={loginForm.touched.password && loginForm.errors.password}
            formikFieldProps={loginForm.getFieldProps('password')}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={loginForm.handleChange}
                checked={loginForm.values.rememberMe}
                name="rememberMe"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Link to={RoutePath.ForgotPassword}>Forgot password?</Link>
          <Button
            disabled={checkButtonStatus}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
