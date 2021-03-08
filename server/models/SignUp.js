const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const SignupSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: 
    {
    type: String,
    trim: true,
    unique:true,
    lowercase:true,
},
    password: String,
    role: {
      type: Number,
      default: 0,
    },
    resetPasswordLink: {
      data: String,
      default: ''
    }
  },
  { timestamps: true }
);
const Signup = mongoose.model("signUp", SignupSchema);

function validateSignup(data) {
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(5).max(30).required(),
    lastname: Joi.string().alphanum().min(5).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),

    password: Joi.string().min(7).max(20).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
function validateLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),

    password: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
function validatePassword(data) {
  const schema = Joi.object({
     newPassword: Joi.string().min(7).max(20).required()
  }).options({ allowUnknown: true });;
  return schema.validate(data, { abortEarly: false });
}
module.exports.Signup = Signup;
module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;
module.exports.validatePassword=validatePassword;
