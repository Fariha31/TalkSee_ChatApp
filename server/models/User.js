const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const {ObjectId} = mongoose.Schema.Types
const UserSchema = mongoose.Schema(
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
    gender:String,
    profileImg: String,
    langPreference : String,
    role: {
      type: Number,
      default: 0,
    },
    resetPasswordLink: {
      data: String,
      default: ''
    },
    friends: [{
           name:String,
           profileImg: String, 
           id: String,
          // chatId: String 
        }],
    friendRequests:[{
            id: String ,
            email:String, 
            name:String,
            profileImg:String
          }],
    sentRequests: [{type:ObjectId,ref:"User"}]
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

function validateSignup(data) {
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(4).max(10).required(),
    lastname: Joi.string().alphanum().min(4).max(10).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),
    password: Joi.string().min(7).max(20).required(),
    gender:Joi.string().required(),
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
  }).options({ allowUnknown: true });
  return schema.validate(data, { abortEarly: false });
}

function validateProfile(data) {
  const schema = Joi.object({
     profileImg: Joi.string().required().messages({'any.required': `"Profile Picture" is required`}),
     langPreference:Joi.string().required().messages({'any.required': `"Langugae" is required`})
     
  }).options({ allowUnknown: true }); 
  return schema.validate(data, { abortEarly: false });
}
function validateSendFriendRequest(data) {
  const schema = Joi.object({
    sentRequests : Joi.array().items({
        id: Joi.string().required()
   })  
  }).options({ allowUnknown: true });;
  return schema.validate(data, { abortEarly: false });
}
//CR=cancel, reject
function validateCRFriendRequest(data) {
  const schema = Joi.object({
    sentRequests :Joi.array().items({
        id: Joi.string().required()
   }),
   friendRequests :Joi.array().items({
        id: Joi.string().required()
   })
     
  }).options({ allowUnknown: true });;
  return schema.validate(data, { abortEarly: false });
}
function validateDeleteFriend(data) {
  const schema = Joi.object({
    friends :Joi.array().items({
        id: Joi.string().required()
   })  
  }).options({ allowUnknown: true });;
  return schema.validate(data, { abortEarly: false });
}
function validateAcceptFriendRequest(data) {
  const schema = Joi.object({
     sentRequests :Joi.array().items({
        id: Joi.string().required()
   }),
   friendRequests : Joi.array().items({
        id: Joi.string().required()
   }),
    friends : Joi.array().items({
        id: Joi.string().required(),
        name:Joi.string().required(),
        profileImg:Joi.string().required(),
   })   
  }).options({ allowUnknown: true });
  return schema.validate(data, { abortEarly: false });
}
module.exports.User = User;
module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;
module.exports.validatePassword=validatePassword;
module.exports.validateProfile =validateProfile;
module.exports.validateSendFriendRequest = validateSendFriendRequest;
module.exports.validateCRFriendRequest = validateCRFriendRequest;
module.exports.validateDeleteFriend = validateDeleteFriend;
module.exports.validateAcceptFriendRequest = validateAcceptFriendRequest;