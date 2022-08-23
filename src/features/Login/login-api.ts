import { AxiosResponse } from 'axios';

import { instance } from 'api/config/apiConfig';

export const loginAPI = {
  login(requestBody: LoginRequestBodyType) {
    return instance.post<LoginRequestBodyType, AxiosResponse<LoginResponseType>>(
      'auth/login',
      requestBody,
    );
  },
  logout() {
    return instance.delete<LogoutResponseType>('auth/me');
  },
  me() {
    return instance.post<MeResponseType>('auth/me');
  },
  updateUserInfo(data: { name?: string; avatar?: string }) {
    return instance.put<UpdateUserInfoResponseType>('auth/me', data);
  },
};

export type LoginRequestBodyType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type DeviceTokensItemType = {
  _id: string;
  device: string;
  token: string;
  tokenDeathTime: number;
};

type LoginResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  __v: number;
  token: string;
  tokenDeathTime: number;
  avatar?: string;
  deviceTokens: DeviceTokensItemType[];
};

type MeResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  __v: number;
  token: string;
  tokenDeathTime: number;
  avatar?: string;
};

type LogoutResponseType = {
  info: string;
};

type UpdateUserInfoResponseType = {
  token: string;
  tokenDeathTime: number;
  updatedUser: MeResponseType;
};
