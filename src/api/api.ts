import axios from 'axios';

const API = 'https://lorby-production.up.railway.app';

const header = {
  'Content-Type': 'application/json',
};

const instance = axios.create({
  baseURL: 'https://lorby-production.up.railway.app/',
  timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
});

export const checkUserAPI = async (
  type: 'username' | 'email',
  string: string,
) => {
  try {
    const data = `{"${type}": "${string}"}`;
    const response = await instance.post('/v1/auth/check-presence', data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUserAPI = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    const obj = {
      username: username,
      password: password,
      email: email,
    };
    await instance.post('/v1/auth/registration', JSON.stringify(obj));
  } catch (error) {
    throw error.response.data;
  }
};

export const sendValidateEmailAPI = async (email: string) => {
  try {
    await instance.post('/v1/auth/resend-confirmation', { email: email });
  } catch (error) {
    throw error.response.data;
  }
};

export const validateEmailAPI = async (token: string) => {
  try {
    await instance.put('/v1/auth/confirmation', null, {
      params: {
        ct: token,
      },
    });
  } catch (error) {
    throw error.response.data;
  }
};

export const userLoginAPI = async (username: string, password: string) => {
  try {
    const obj = {
      username: username,
      password: password,
    };
    const response = await instance.post('/v1/auth/login', JSON.stringify(obj));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const refreshTokenAPI = async (refreshToken: string) => {
  try {
    let data = `Bearer ${refreshToken}`;

    const accessToken = await instance.post('/v1/auth/refresh-token', data);
    return accessToken.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserAPI = async (accessToken: string) => {
  try {
    const response = await instance.get('/v1/users', {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPasswordAPI = async (
  password: string,
  resetToken: string,
) => {
  try {
    const obj = `{
      "password": "${password}"
    }`;

    const response = await instance.put('/v1/auth/reset-password', obj, {
      params: { rpt: resetToken },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const revokeTokenAPI = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    const data = 'Bearer ' + refreshToken;

    const response = await instance.post('/v1/auth/revoke-token', data, {
      headers: {
        'Content-Type': 'text/plain',
        Authorization: 'Bearer ' + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgotPasswordAPI = async (string: string) => {
  try {
    const data = `{"username":"${string}"}`;

    const response = await instance.post('/v1/auth/forgot-password', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
