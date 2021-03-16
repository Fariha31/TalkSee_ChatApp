const { Signup } = require("../models/SignUp");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const config = require("config");
require('dotenv').config();
 
exports.signupVerificationController = async (req, res) => {
  const { firstname,lastname, email, password, gender } = req.body;
  try {
    const emailAlready = await Signup.findOne({ email });
    if (emailAlready) {
      return res.status(400).json({
        errorMessage: "Email Already exists",
      });
    }
     const token = jwt.sign(
      {
        firstname,
        lastname,
        email,
        password,
        gender
      },
      config.get("jwtPrivateKey"),
      { expiresIn: '10m' }
    );

    let transporter = nodemailer.createTransport({
       service: 'gmail',
      auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
      },
       tls: {
          rejectUnauthorized: false
      }
    })
    const emailData = {
      from: process.env.EMAIL,
      to:  email,
      subject: 'Account activation link',
      html: ` <head>
             <style>    
              .card {
                    box-shadow: 0 4px 8px 0 rgba(144,171,188,0.2);
                    transition: 0.3s;
                    text-align: center;
                    }
               h1{
                 color: rgb(161, 136, 127);
                  font-family: Brush Script MT, Brush Script Std, cursive
               }
                .link {
                       background-color: #0ABBD8;
                      color: white !important;
                      padding: 10px 25px;
                      text-align: center;
                      text-decoration: none;
                      display: inline-block;
                      border-radius: 14px;
                     }

               a:hover, a:active {
                      background-color: #8dadaf;
                      color: white;
  
                     }
                     p {
                       color : #797D7F;
                       text-align: center;
                     }
                     h2{
                       color:black;
                     }
               </style>
              </head>
              <body>
                    <div class="card">
                    <h1>TalkSee</h1>
                    <h2>Verify Email Address</h2> 
                    <p><i>Hey <strong>${firstname +" "+ lastname}</strong>, To become a member of TalkSee family let's verify your account by clicking below button. Once it's done you will be able to register your account</i></p>
                    <a class ="link" href="http://localhost:3000/user/activate/${token}" >Verify my email</a>
                    <hr />
                    </div>
               </body>
                `
   };
       transporter.sendMail(emailData).then(sent => {
               res.status(200).json({
               successMessage: `Email has been sent to ${email}`});})
          .catch(err => {
               res.status(500).json({
               errorMessage: "Nodemialer Error in signup" });});
  } catch (err) {
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};
exports.activationController = async (req, res) => {
  const { token } = req.body;
  if(token) {
  jwt.verify(token, config.get("jwtPrivateKey"), (err) => {
      if (err) {
        return res.status(401).json({
          errorMessage: 'Link expired, Signup again',
          firstname:firstname,
          lastname:lastname
        });
      }  });
     const { firstname,lastname, email, password,gender } = jwt.decode(token);
  try{
    const emailAlready = await Signup.findOne({ email });
    if (emailAlready) {
      return res.status(400).json({
        successMessage: "Your email has been registered already",
          firstname:firstname,
          lastname:lastname
      });
    }
     const newUser = new Signup();
    newUser.firstname = firstname;
    newUser.lastname=lastname;
    newUser.email = email;
    newUser.gender=gender;
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
      
    await newUser.save();
     res.status(200).json({
      successMessage: "Successfully Registered",
      firstname:firstname,
      lastname:lastname
    });
  }catch (err) {
        return res.status(400).json({
         errorMessage: "Failed to register your account",
         firstname:firstname,
         lastname:lastname
    });
  }} else {
         return  res.status(400).json({
              errorMessage: 'Signup failed because no token identify',
               firstname:firstname,
               lastname:lastname});
            }

}
exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "Account not registered",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        errorMessage: "Invalid password",
      });
    }
    const payload = {
      user: { _id: user._id, },
     };
    jwt.sign(payload, config.get("jwtPrivateKey"), (err, token) => {
      if (err) console.log("JWT sign error in Login");
      const { _id, firstname,lastname, email, role } = user;
      res.json({
        token,
        user: { _id, firstname,lastname, email, role },
      });
    });
   } catch (err) {
     return res.status(500).json({
      errorMessage: "Server Error in Login Controller",
    });
  }

};
exports.forgotPasswordController = async (req, res) => {
 const { email } = req.body;
  try{
     const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "User not found. Please Signup",
      });
    }
 else{
 const payload = {
      user: {
        _id: user._id,
      },
    };
    const token = jwt.sign(
      payload,config.get("jwtResetKey"),{expiresIn: '10m'}
    );
     let transporter = nodemailer.createTransport({
       service: 'gmail',
      auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
      },
       tls: {
          rejectUnauthorized: false
      }
    })
      const emailData = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset link',
      html: ` <head>
             <style>    
              .card {
                    box-shadow: 0 4px 8px 0 rgba(144,171,188,0.2);
                    transition: 0.3s;
                    text-align: center;
                    }
               h1{
                 color: rgb(161, 136, 127);
                  font-family: Brush Script MT, Brush Script Std, cursive
               }
              p {
                       color : #797D7F;
                       text-align: center;
                     }
                     h2{
                       color:black;
                     }
               </style>
              </head>
              <body>
                    <div class="card">
                    <h1>TalkSee</h1>
                    <h2>Click below link to reset your password</h2> 
                    <p>http://localhost:3000/reset-password/${token}</p>
                    <hr />
                    </div>
               </body>
                `
    };
        return user.updateOne(
          {
            resetPasswordLink: token
          },
          (err) => {
            if (err) {
              return res.status(400).json({
                errorMessage:
                  'Database connection error on user password forgot request'
              });
            } else {
               transporter.sendMail(emailData)
                .then(sent => {
                  return res.json({
                    successMessage: `Email has been sent to ${email}`
                  });
                })
                .catch(err => {
                   res.status(500).json({
                   errorMessage: "Error in email sent FP",
                   });
                });
            }
          }
        );

  }
}
  catch (err) {
    return res.status(500).json({
      errorMessage: "Server Error in FP Controller",
    });
  }
};
exports.resetPasswordController = async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

try {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, config.get("jwtResetKey"), (err) => {
      if (err) {
        return res.status(401).json({
          errorMessage: 'Reset Password Link expired, Try again',
        });
      } });
    
          let user = await Signup.findOne({resetPasswordLink});
           if(user){
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(newPassword, salt);
              user.resetPasswordLink='';
              await user.save();
               return res.status(200).json({
            successMessage: "Password successfully updated",
    });
           }
           else{
                return  res.status(500).json({
                errorMessage: "Your password is already updated.Please login",
           });
           }
      
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: "Link is not recognized",
    });
  }
};
exports.profileSetupController = async (req, res) => {
  const {profileImg, langPreference, token}= req.body;
  try{
   const{email} = jwt.decode(token);
   console.log(langPreference);
    let user = await Signup.findOne({email});
    if(user){
    user.profileImg=profileImg;
    user.langPreference=langPreference;
     await user.save();
               return res.status(200).json({
            successMessage: "Profile has been created",
    });
  }
  else{
                return  res.status(500).json({
                errorMessage: "profile not set",
           });
           }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: "Error in Profile Controller",
    });
  }
}