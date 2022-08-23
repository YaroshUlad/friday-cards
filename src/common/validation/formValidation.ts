import * as yup from 'yup';

import { minPasswordLength } from '../constants/constants';

export const registerSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(minPasswordLength, 'Too Short!').required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(minPasswordLength, 'Too Short!').required('Required'),
});

export const forgotSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
});

export const createNewPasswordSchema = yup.object().shape({
  password: yup.string().min(minPasswordLength, 'Too Short!').required('Required'),
});
