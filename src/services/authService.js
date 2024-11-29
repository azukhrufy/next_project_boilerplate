const { servicePost } = require("./_factory");

const authService = {
  loginWithPassword: (email, password) =>
    servicePost(`/v1/auth/login`, { email, password }),
  logout: () => servicePost(`/v1/auth/logout`),
  getNewToken: () => servicePost(`/v1/auth/refresh-tokens`),
};

export default authService;
