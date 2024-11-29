const { object, string } = require("yup");

const createUser = object().shape({
  name: string().required("Name is required"),
  email: string().email().required("Email is required"),
  password: string().required("Password is required"),
  role: string().required("Role is required"),
});

const createUserValidator = {
  createUser,
};

export default createUserValidator;
