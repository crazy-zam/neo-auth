const login = {
  endpoint: '/login',
  method: 'post',
  request: { login: 'string', password: 'string' },
  response: { refreshToken: 'jwt', accessToken: 'jwt'  },
};
const logout = {
  endpoint: '/logout',
  method: 'delete',
  header: { authorisation: 'bearer refresh jwt' },
  response: { message: 'string' },
};

const getProfile = {
  endpoint: '/users',
  method: 'get',
  header: { authorisation: 'bearer access jwt' },
  response: { email: 'string', login: 'string' },
};

const refreshToken = {
  endpoint: '/refresh',
  method: 'get',
  header: { authorisation: 'bearer refresh jwt' },
  response: { refreshToken: 'jwt', accessToken: 'jwt'  },
};

const checkUser = {
  endpoint: '/checkUser',
  method: 'post',
  request: { email: 'string', login: 'string'},
  response: { message: { email: 'true', login: 'false'} },
};

const registration = {
  endpoint: '/register',
  method: 'post',
  request: { email: 'string', login: 'string', password: 'string' },
  response: { message: 'string' },
};

const emailValidate = {
  endpoint: '/confirmation',
  method: 'post',
  parameters: 'token',
  response: { message: 'string' },
};

const resendEmailValidation = {
  endpoint: '/resendConfirmation',
  method: 'post',
  request: { email: 'string' || login: 'string' },
  response: { message: 'string' },
};