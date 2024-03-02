import * as UserActionCreators from './user';
import * as RegistrationActionCreators from './registration';
import * as UserCheckActionCreators from './checkUser';

export default {
  ...UserActionCreators,
  ...RegistrationActionCreators,
  ...UserCheckActionCreators,
};
