import {
  RegistrationAction,
  RegistrationState,
  FetchRegistrationTypes,
} from '@/types/registration';

const defaultState: RegistrationState = {
  user: { username: '', email: '', password: '' },
  status: '',
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
        status: 'loading',
      };
    case FetchRegistrationTypes.FETCH_REGISTRATION_SUCCESS:
      return {
        ...state,
        status: 'success',
      };
    case FetchRegistrationTypes.FETCH_REGISTRATION_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case FetchRegistrationTypes.EMAIL_VALIDATED:
      return {
        ...state,
        emailValidated: true,
      };
    case FetchRegistrationTypes.RESET_REGISTRAION:
      return defaultState;
    default:
      return state;
  }
};

export default registrationReducer;
