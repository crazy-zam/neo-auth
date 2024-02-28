import * as UserActionCreators from './user';
import * as RegistrationActionCreators from './registration';

export default {
  ...UserActionCreators,
  ...RegistrationActionCreators,
};
