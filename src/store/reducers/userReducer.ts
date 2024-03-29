import { UserState, FetchUserTypes, UserAction } from '@/types/user';

const defaultState: UserState = {
  username: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  isAuth: false,
};

const userReducer = (state = defaultState, action: UserAction): UserState => {
  switch (action.type) {
    case FetchUserTypes.FETCH_LOGIN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuth: true,
      };
    case FetchUserTypes.FETCH_LOGOUT:
      return defaultState;

    case FetchUserTypes.FETCH_GET_USER:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
      };
    case FetchUserTypes.FETCH_REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
};

export default userReducer;
