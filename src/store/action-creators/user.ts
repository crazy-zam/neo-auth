import { UserAction, FetchUserTypes } from '@/types/user';
import { Dispatch } from 'redux';
import {
  getUserAPI,
  refreshTokenAPI,
  userLoginAPI,
  revokeTokenAPI,
} from '@/api/api';
import { toast } from 'react-toastify';
const errorNotify = (mess: string) =>
  toast.error(mess, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    style: { border: '2px solid red', color: 'red', width: '650px' },
    closeButton: false,
  });

export const userLoginAction = (username: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const tokens = await userLoginAPI(username, password);
      dispatch({
        type: FetchUserTypes.FETCH_LOGIN,
        payload: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      });
      localStorage.setItem('access', tokens.accessToken);
      localStorage.setItem('refresh', tokens.refreshToken);
      const user = await getUserAPI(tokens.accessToken);

      dispatch({
        type: FetchUserTypes.FETCH_GET_USER,
        payload: {
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      errorNotify(error);
      // console.log(error);
    }
  };
};

export const getUserAction = (accessToken: string, refreshToken: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await getUserAPI(accessToken);
      dispatch({
        type: FetchUserTypes.FETCH_LOGIN,
        payload: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
      dispatch({
        type: FetchUserTypes.FETCH_GET_USER,
        payload: {
          username: response.username,
          email: response.email,
        },
      });
    } catch (error) {
      errorNotify(error);
      console.log(error);
    }
  };
};

export const refreshTokenAction = (refreshToken: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await refreshTokenAPI(refreshToken);

      dispatch({
        type: FetchUserTypes.FETCH_REFRESH_TOKEN,
        payload: {
          accessToken: response,
          refreshToken: refreshToken,
        },
      });
    } catch (error) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      dispatch({
        type: FetchUserTypes.FETCH_LOGOUT,
      });
      console.log(error);
    }
  };
};

export const logoutAction = (refreshToken: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await revokeTokenAPI(refreshToken);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      dispatch({
        type: FetchUserTypes.FETCH_LOGOUT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
