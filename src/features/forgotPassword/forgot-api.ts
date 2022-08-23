import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});

export const forgotAPI = {
  forgot(email: string) {
    const data = {
      email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style='background-color: lime; padding: 15px'>
password recovery link: 
<a href='http://localhost:3000/createNewPassword/$token$'>
link</a>
</div>`,
    };
    return instance.post('auth/forgot', data);
  },
  createNewPassword(password: string, resetPasswordToken: string) {
    const data = {
      password,
      resetPasswordToken,
    };
    return instance.post('auth/set-new-password', data);
  },
};

// NEED RESPONSE TYPES FOR THIS REQUESTS BELOW
