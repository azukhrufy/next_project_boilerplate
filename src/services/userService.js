const { serviceGet, servicePost } = require("./_factory");

const getById = (id, query, token) =>
  serviceGet(`/v1/users/${id}`, query, token);

const getList = (query, token) => serviceGet(`/v1/users`, query, token);

const createUser = (payload, token) => servicePost(`/v1/users`, payload, token);

const userService = {
  getById,
  getList,
  createUser,
};

export default userService;
