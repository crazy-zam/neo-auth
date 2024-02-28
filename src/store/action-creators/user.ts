import { UserAction, FetchUserTypes } from '@/types/user';
import { Dispatch } from 'redux';
import { refreshTokenAPI, userLoginAPI } from '@/api/api';

export const userLogin = (username: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await userLoginAPI(username, password);
      dispatch({
        type: FetchUserTypes.FETCH_LOGIN,
        payload: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// export const getUser = (accessToken: string) => {
//    return async (dispatch: Dispatch<UserAction>) => {
//      try {
//        const formData = new FormData();
//        formData.append('username', username);
//        formData.append('password', password);
//        const response = await axios.post(`${API}/v1/auth/login`, formData);
//        // return response.data;
//        dispatch({
//          type: FetchUserTypes.FETCH_LOGIN,
//          payload: {
//            accessToken: response.data.accessToken,
//            refreshToken: response.data.refreshToken,
//          },
//        });
//      } catch (error) {}
//    };
//  };

export const refreshToken = (refreshToken: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await refreshTokenAPI(refreshToken);
      dispatch({
        type: FetchUserTypes.FETCH_REFRESH_TOKEN,
        payload: {
          accessToken: response,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
