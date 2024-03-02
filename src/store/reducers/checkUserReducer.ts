import {
  RegistrationAction,
  RegistrationState,
  FetchRegistrationTypes,
} from '@/types/checkUser';

const defaultState: RegistrationState = {
  username: { loading: false, checked: false, error: '' },
  email: { loading: false, checked: false, error: '' },
};
const checkUserReducer = (
  state = defaultState,
  action: RegistrationAction,
): RegistrationState => {
  switch (action.type) {
    case FetchRegistrationTypes.CHECK_USERNAME:
      return {
        ...state,
        username: { ...state.username, loading: true, checked: false },
      };
    case FetchRegistrationTypes.CHECK_USERNAME_SUCCESS:
      return {
        ...state,
        username: {
          ...state.username,
          loading: false,
          checked: true,
          error: '',
        },
      };
    case FetchRegistrationTypes.CHECK_USERNAME_ERROR:
      return {
        ...state,
        username: {
          ...state.username,
          loading: false,
          checked: true,
          error: action.payload,
        },
      };

    case FetchRegistrationTypes.CHECK_EMAIL:
      return {
        ...state,
        email: { ...state.email, loading: true, checked: false },
      };
    case FetchRegistrationTypes.CHECK_EMAIL_SUCCESS:
      return {
        ...state,
        email: {
          ...state.email,
          loading: false,
          checked: true,
          error: '',
        },
      };
    case FetchRegistrationTypes.CHECK_EMAIL_ERROR:
      return {
        ...state,
        email: {
          ...state.email,
          loading: false,
          checked: true,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default checkUserReducer;
