import { Dispatch } from 'redux';

import { FetchRegistrationTypes, RegistrationAction } from '@/types/checkUser';
import { checkUserAPI } from '@/api/api';

export const checkUsername = (username: string) => {
  return async (dispatch: Dispatch<RegistrationAction>) => {
    try {
      dispatch({
        type: FetchRegistrationTypes.CHECK_USERNAME,
      });
      const response = await checkUserAPI('username', username);
      if (!response)
        dispatch({
          type: FetchRegistrationTypes.CHECK_USERNAME_SUCCESS,
        });
      else
        dispatch({
          type: FetchRegistrationTypes.CHECK_USERNAME_ERROR,
          payload: 'not allowed',
        });
    } catch (error) {
      dispatch({
        type: FetchRegistrationTypes.CHECK_USERNAME_ERROR,
        payload: error.message,
      });
    }
  };
};

export const checkEmail = (email: string) => {
  return async (dispatch: Dispatch<RegistrationAction>) => {
    try {
      dispatch({
        type: FetchRegistrationTypes.CHECK_EMAIL,
      });
      const response = await checkUserAPI('email', email);
      if (!response)
        dispatch({
          type: FetchRegistrationTypes.CHECK_EMAIL_SUCCESS,
        });
      else
        dispatch({
          type: FetchRegistrationTypes.CHECK_EMAIL_ERROR,
          payload: 'not allowed',
        });
    } catch (error) {
      dispatch({
        type: FetchRegistrationTypes.CHECK_EMAIL_ERROR,
        payload: error.message,
      });
    }
  };
};

export const resetCheck = () => {
  return async (dispatch: Dispatch<RegistrationAction>) => {
    dispatch({
      type: FetchRegistrationTypes.RESET_CHECKS,
    });
  };
};
