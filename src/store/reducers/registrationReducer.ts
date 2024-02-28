import {
  RegistrationAction,
  RegistrationState,
  FetchRegistrationTypes,
} from '@/types/registration';

const defaultState: RegistrationState = {
  user: { username: '', email: '', password: '' },
  loading: false,
  error: '',
  emailValidated: false,
};
const registrationReducer = (
  state = defaultState,
  action: RegistrationAction,
): RegistrationState => {
  switch (action.type) {
    case FetchRegistrationTypes.FETCH_REGISTRATION:
      return {
        ...state,
        user: {
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
        },
        loading: true,
      };
    case FetchRegistrationTypes.FETCH_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FetchRegistrationTypes.FETCH_REGISTRATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FetchRegistrationTypes.EMAIL_VALIDATED:
      return {
        ...state,
        emailValidated: true,
      };
    default:
      return state;
  }
};

export default registrationReducer;
