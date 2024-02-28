import { Dispatch } from 'redux';

import {
  FetchRegistrationTypes,
  RegistrationAction,
} from '@/types/registration';
import { registerUserAPI, validateEmailAPI } from '@/api/api';

export const registerUser = (
  email: string,
  username: string,
  password: string,
) => {
  return async (dispatch: Dispatch<RegistrationAction>) => {
    try {
      dispatch({
        type: FetchRegistrationTypes.FETCH_REGISTRATION,
        payload: {
          email: email,
          username: username,
          password: password,
        },
      });
      await registerUserAPI(email, username, password);
      dispatch({
        type: FetchRegistrationTypes.FETCH_REGISTRATION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: FetchRegistrationTypes.FETCH_REGISTRATION_ERROR,
        payload: error,
      });
    }
  };
};

export const validateEmail = (token: string) => {
  return async (dispatch: Dispatch<RegistrationAction>) => {
    try {
      await validateEmailAPI(token);
      dispatch({
        type: FetchRegistrationTypes.EMAIL_VALIDATED,
      });
    } catch (error) {
      dispatch({
        type: FetchRegistrationTypes.FETCH_REGISTRATION_ERROR,
        payload: error,
      });
    }
  };
};
