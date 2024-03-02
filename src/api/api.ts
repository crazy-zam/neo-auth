import axios from 'axios';

const API = 'https://lorby-production.up.railway.app';

const header = {
  'Content-Type': 'application/json',
};

export const checkUserAPI = async (
  type: 'username' | 'email',
  string: string,
) => {
  try {
    const data = `{"${type}": "${string}"}`;
    const response = await axios.post(`${API}/v1/auth/check-presence`, data, {
      headers: header,
    });

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

    await axios.post(`${API}/v1/auth/registration`, JSON.stringify(obj), {
      headers: header,
    });
  } catch (error) {
    throw error.response.data;
  }
};

export const sendValidateEmailAPI = async (email: string) => {
  try {
    const response = await axios.post(
      `${API}/v1/auth/resend-confirmation`,
      { email: email },
      {
        headers: header,
      },
    );
  } catch (error) {
    throw error.response.data;
  }
};

export const validateEmailAPI = async (token: string) => {
  try {
    await axios.get(`${API}/v1/auth/confirmation`, {
      headers: header,
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

    const response = await axios.post(
      `${API}/v1/auth/login`,
      JSON.stringify(obj),
      {
        headers: header,
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const refreshTokenAPI = async (refreshToken: string) => {
  try {
    let data = `Bearer ${refreshToken}`;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API}/v1/auth/refresh-token`,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const accessToken = axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    return accessToken;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserAPI = async (accessToken: string) => {
  try {
    const header = {
      Authorization: 'Bearer ' + accessToken,
    };
    const response = await axios.get(`${API}/v1/users`, {
      headers: header,
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
    const obj = {
      password: password,
    };

    const response = await axios.put(
      `${API}/v1/auth/reset-password`,
      JSON.stringify(obj),
      {
        params: { rpt: resetToken },
      },
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const revokeTokenAPI = async (refreshToken: string) => {
  try {
    const data = `Bearer ${refreshToken}`;
    const response = await axios.post(`${API}/v1/auth/revoke-token`, data, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgotPasswordAPI = async (
  type: 'username' | 'email',
  string: string,
) => {
  try {
    const data = `{'${type}':'string${string}'}`;
    const response = await axios.post(`${API}/v1/auth/forgot-password`, data, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
