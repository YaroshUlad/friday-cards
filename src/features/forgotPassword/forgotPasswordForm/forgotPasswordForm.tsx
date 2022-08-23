import React from 'react';

import { Button, FormControl, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { useAppDispatch } from 'app/store';
import { forgotSchema } from 'common/validation/formValidation';
import { forgotPassword } from 'features/forgotPassword/forgot-reducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const ForgotPasswordForm = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const forgotPasswordForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotSchema,
    onSubmit: () => {
      dispatch(forgotPassword(forgotPasswordForm.values.email));
      forgotPasswordForm.resetForm();
    },
  });

  return (
    <form onSubmit={forgotPasswordForm.handleSubmit}>
      <FormControl>
        <TextField
          label="Email"
          margin="normal"
          variant="standard"
          error={
            forgotPasswordForm.touched.email && Boolean(forgotPasswordForm.errors.email)
          }
          helperText={forgotPasswordForm.touched.email && forgotPasswordForm.errors.email}
          {...forgotPasswordForm.getFieldProps('email')}
        />
        <p>Enter your email address and we will send you further instructions</p>

        <Button
          disabled={!!forgotPasswordForm.errors.email}
          type="submit"
          fullWidth
          variant="contained"
        >
          Send Instruction
        </Button>
      </FormControl>
    </form>
  );
};
