const joi = require("joi");

const registerValidation = joi.object({
  firstname: joi.string().min(3).max(50).required(),
  lastname: joi.string().min(3).max(50).required(),
  email: joi.string().min(5).max(50).required().trim(),
  password: joi.string().min(8).max(50).required(),
});

const loginValidation = joi.object({
  email: joi.string().min(5).max(50).required().trim(),
  password: joi.string().required(),
});

module.exports = { registerValidation, loginValidation };
