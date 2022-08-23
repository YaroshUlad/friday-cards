import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});
