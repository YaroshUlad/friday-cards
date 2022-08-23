import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import { FieldInputProps } from 'formik';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  error: boolean | undefined;
  helperText: string | false | undefined;
  formikFieldProps: FieldInputProps<any>;
};

export const PasswordWithVisibility = React.memo(
  (props: PropsType): ReturnComponentType => {
    const { error, helperText, formikFieldProps } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = (): void => setShowPassword(!showPassword);
    const handleOnBlurPassword = (): void => setShowPassword(false);
    return (
      <FormControl>
        <TextField
          variant="standard"
          margin="normal"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...formikFieldProps}
          error={error}
          helperText={helperText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onBlur={handleOnBlurPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    );
  },
);
