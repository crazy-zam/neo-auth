export interface RegistrationState {
  username: { loading: boolean; checked: boolean; error: string };
  email: { loading: boolean; checked: boolean; error: string };
}

export enum FetchRegistrationTypes {
  CHECK_USERNAME = 'CHECK_USERNAME',
  CHECK_USERNAME_SUCCESS = 'CHECK_USERNAME_SUCCESS',
  CHECK_USERNAME_ERROR = 'CHECK_USERNAME_ERROR',
  CHECK_EMAIL = 'CHECK_EMAIL',
  CHECK_EMAIL_SUCCESS = 'CHECK_EMAIL_SUCCESS',
  CHECK_EMAIL_ERROR = 'CHECK_EMAIL_ERROR',
}

interface CheckUsernameAction {
  type: FetchRegistrationTypes.CHECK_USERNAME;
}
interface CheckUsernameSuccessAction {
  type: FetchRegistrationTypes.CHECK_USERNAME_SUCCESS;
}
interface CheckUsernameErrorAction {
  type: FetchRegistrationTypes.CHECK_USERNAME_ERROR;
  payload: string;
}
interface CheckEmailAction {
  type: FetchRegistrationTypes.CHECK_EMAIL;
}
interface CheckEmailSuccessAction {
  type: FetchRegistrationTypes.CHECK_EMAIL_SUCCESS;
}
interface CheckEmailErrorAction {
  type: FetchRegistrationTypes.CHECK_EMAIL_ERROR;
  payload: string;
}
export type RegistrationAction =
  | CheckUsernameAction
  | CheckUsernameSuccessAction
  | CheckUsernameErrorAction
  | CheckEmailAction
  | CheckEmailSuccessAction
  | CheckEmailErrorAction;
