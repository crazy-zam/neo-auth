import axios from 'axios';

const API = 'https://lorby-production.up.railway.app';

export const registerUserAPI = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    const response = await axios.post(`${API}/v1/auth/registration`, formData);
    console.log(response);
  } catch (error) {
    throw error;
  }
};

export const validateEmailAPI = async (token: string) => {
  try {
    const response = await axios.get(`${API}/v1/auth/confirmation`, {
      params: {
        ct: token,
      },
    });
    console.log(response);
  } catch (error) {
    throw error;
  }
};

export const userLoginAPI = async (username: string, password: string) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const response = await axios.post(`${API}/v1/auth/login`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenAPI = async (refreshToken: string) => {
  try {
    const response = await axios.get(`${API}/v1/auth/refreshToken`, {
      params: {
        refreshToken: refreshToken,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
