export interface RegistrationState {
  user: { username: string; email: string; password: string };
  loading: boolean;
  error: string;
  emailValidated: boolean;
}

export enum FetchRegistrationTypes {
  FETCH_REGISTRATION = 'FETCH_REGISTRATION',
  FETCH_REGISTRATION_SUCCESS = 'FETCH_REGISTRATION_SUCCESS',
  FETCH_REGISTRATION_ERROR = 'FETCH_REGISTRATION_ERROR',
  EMAIL_VALIDATED = 'EMAIL_VALIDATED',
}

interface FetchRegistrationAction {
  type: FetchRegistrationTypes.FETCH_REGISTRATION;
  payload: {
    username: string;
    email: string;
    password: string;
  };
}
interface FetchRegistrationSuccesAction {
  type: FetchRegistrationTypes.FETCH_REGISTRATION_SUCCESS;
}
interface FetchRegistrationErrorAction {
  type: FetchRegistrationTypes.FETCH_REGISTRATION_ERROR;
  payload: string;
}
interface EmailValidateAction {
  type: FetchRegistrationTypes.EMAIL_VALIDATED;
}
export type RegistrationAction =
  | FetchRegistrationAction
  | FetchRegistrationSuccesAction
  | FetchRegistrationErrorAction
  | EmailValidateAction;
