export interface UserState {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  isAuth: boolean;
}

export enum FetchUserTypes {
  FETCH_LOGIN = 'FETCH_LOGIN',
  FETCH_LOGOUT = 'FETCH_LOGOUT',
  FETCH_GET_USER = 'FETCH_GET_USER',
  FETCH_REFRESH_TOKEN = 'FETCH_REFRESH_TOKEN',
}

interface FetchLoginAction {
  type: FetchUserTypes.FETCH_LOGIN;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}
interface FetchLogoutAction {
  type: FetchUserTypes.FETCH_LOGOUT;
}
interface FetchGetUserAction {
  type: FetchUserTypes.FETCH_GET_USER;
  payload: {
    username: string;
    email: string;
  };
}

interface FetchRefreshTokenAction {
  type: FetchUserTypes.FETCH_REFRESH_TOKEN;
  payload: {
    accessToken: string;
  };
}
export type UserAction =
  | FetchLoginAction
  | FetchLogoutAction
  | FetchGetUserAction
  | FetchRefreshTokenAction;
