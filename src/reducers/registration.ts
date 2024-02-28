const defaultState = {
  user: { login: '', email: '', password: '' },
  emailValidation: false,
  emailValidationTime: '',
};

const registrationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'REGISTRATION_TRY':
      return {
        ...state,
        user: {
          login: action.payload.login,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    case 'EMAIL_SEND':
      return {
        ...state,
        emailValidation: true,
        emailValidationTime: action.payload,
      };
    case 'RESET_STATE':
      return defaultState;
    default:
      return state;
  }
};
