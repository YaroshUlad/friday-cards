import { AxiosResponse } from 'axios';

import { instance } from 'api/config/apiConfig';

export const registerApi = {
  createUser(email: string, password: string) {
    return instance.post<RegisterRequestBodyType, AxiosResponse<LoginResponseType>>(
      'auth/register',
      {
        email,
        password,
      },
    );
  },
};

// Types
type RegisterRequestBodyType = { email: string; password: string };

type LoginResponseType = {
  addedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
  };
};

export type LoginErrorType = {
  error: string;
  email: string;
  in: string;
};
