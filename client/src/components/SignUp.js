import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import {
  TextField,
  Grid,
  Button,
  InputAdornment,
  InputLabel,
  FormControl,
  Input,
  IconButton,
  Typography,
} from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link, useHistory } from "react-router-dom";
import { grey, cyan, brown} from '@material-ui/core/colors';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import LinearBuffer from "../Alerts/ProgressBar";
import AlertBar from "../Alerts/AlertBar";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { signup } from "../api/auth";
import { isAuthenticated } from "../clientStorages.js/auth";
 

const useStyles = makeStyles((theme) => ({
   
  textfield: {
     margin: theme.spacing(1),
  },
  margin:{
    margin: theme.spacing(1),
    marginLeft:"0.5rem",
  }
   
}));
const SignUp = () => {
  const classes = useStyles();
  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1)
      history.push("/dashboard");
    else if (isAuthenticated() && isAuthenticated().role === 0)
      history.push("/dashboard");
  }, [history]);
  const [values, setValues] = useState({
    firstname: "Fariha",
    lastname:"Liaqat",
    email: "farihaliaqat31@gmail.com",
    gender:"",
    password: "1234567",
    confirmPassword: "1234567",
    errorMessage: "",
    successMsg: "",
    showPassword: false,
    showPassword1: false,
    loading: false,
  });
  const {
    firstname,
    lastname,
    email,
    gender,
    password,
    confirmPassword,
    errorMessage,
    successMsg,
    loading,
  } = values;
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      errorMessage: "",
      successMsg: "",
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword1: !values.showPassword1 });
  };
   
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleTextChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
      errorMessage: "",
      successMsg: "",
    });
  };
  const Register = (event) => {
    event.preventDefault();
    if (
      isEmpty(firstname) ||
       isEmpty(lastname) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)
    ) {
      setValues({ ...values, errorMessage: "All fields are required" });
    } else if (!isEmail(email)) {
      setValues({ ...values, errorMessage: "Invalid Email" });
    } else if (!equals(password, confirmPassword)) {
      setValues({ ...values, errorMessage: "Password do not matched" });
    } else {
      const { firstname,lastname, email, password } = values;
      const data = { firstname,lastname,  email, password };
      setValues({ ...values, loading: true });
      signup(data)
        .then((response) => {
          setValues({
            ...values,
            firstname: "",
            lastname:"",
            email: "",
            password: "",
            confirmPassword: "",
            errorMessage: false,
            successMsg: response.data.successMessage,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          setValues({
            ...values,
            loading: false,
            errorMessage: err.response.data.errorMessage,
          });
        });
    }
  };
   const SignUpHeader = () => (
    <Grid container >
      <Grid item xs={1} sm={2} xm={5} md={4}></Grid>
      <Grid item xs={10} sm={8} xm={2} md={4}>
         <Typography variant="headline" style={{marginBottom:"2rem", 
         marginTop:"3rem",
         textAlign:"center",
         fontSize:"5rem",
         color:brown[300],
         fontFamily:"Brush Script MT, Brush Script Std, cursive"}}
          component="h1">TalkSee</Typography>
        <hr/>
        <Grid container style={{textAlign:"center"}}>
          <Grid item xs={6} >
            <Link className="active-header"  to="/login">Sign In</Link>      
          </Grid>
          <Grid item xs={6}>
            <Link className="header" to="/signup">Sign Up</Link>
          </Grid>

        </Grid>   
      </Grid>
      
    <Grid item  xs={1} sm={2} xm={5} md={4}></Grid>
 
    </Grid>
  );
  const SignUpForm = () => (
    <div className="signup-container">
      <Grid container>
        <Grid item xs={1} sm={3} md={4}></Grid>
        <Grid item xs={10} sm ={6} md={4}>
          <TextField
            className={classes.textfield}
            id="filled-start-adornment"
             style={{marginTop:"2rem"}}
            value={values.firstname}
            label= {
              <div> 
             <Typography variant="headline" style={{fontWeight:"bold",fontStyle:"italic"  }}> Firstname </Typography>
             <Typography variant="headline" style={{color:"red"}}>*</Typography>
                  </div>
            }
            name="firstname"
            
            fullWidth
            onChange={handleTextChange}
             InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AccountCircleIcon style={{ color: grey[600] }}/>
            </InputAdornment>
          ),
        }}
          />
           <TextField
            className={classes.textfield}
            id="filled-start-adornment"
            value={values.lastname}
            label= {
              <div> 
             <Typography variant="headline" style={{fontWeight:"bold",fontStyle:"italic"  }}> Lastname </Typography>
             <Typography variant="headline" style={{color:"red"}}>*</Typography>
                  </div>
            }
            name="lastname"
            
            fullWidth
            onChange={handleTextChange}
             InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AccountCircleIcon style={{ color: grey[600] }}/>
            </InputAdornment>
          ),
        }}
          />
          <TextField
            className={classes.textfield}
            label= {
              <div> 
             <Typography variant="headline" style={{fontWeight:"bold",fontStyle:"italic" }}> Email Address </Typography>
             <Typography variant="headline" style={{color:"red"  }}>*</Typography>
                  </div>
            }
            id="filled-start-adornment1"
            
            name="email"
            value={values.email}
            fullWidth
            onChange={handleTextChange}
             InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <EmailIcon style={{ color: grey[600] }}/>
            </InputAdornment>
          ),
        }}
          />
              
        <FormControl className={clsx(classes.margin, classes.textField)} fullWidth>
         <InputLabel htmlFor="standard-adornment-password"> 
             <Typography variant="headline" style={{fontWeight:"bold",fontStyle:"italic"  }}> Password</Typography>
             <Typography variant="headline" style={{color:"red",marginLeft:"0.4rem" }}>*</Typography>
         </InputLabel>
                    <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            name="password"
            value={values.password}
            onChange={handleChange('password')}
              
          startAdornment= {
            <InputAdornment position="start">
             <LockIcon style={{ color: grey[600] }}/>
            </InputAdornment>
          }
        
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
         
          <FormControl className={clsx(classes.margin, classes.textField)} fullWidth>
                 <InputLabel htmlFor="standard-adornment-password"> 
             <Typography variant="headline" style={{fontWeight:"bold",fontStyle:"italic"  }}> Confirm Password</Typography>
             <Typography variant="headline" style={{color:"red",marginLeft:"0.4rem" }}>*</Typography>
         </InputLabel>
           <Input
            id="standard-adornment-confirmPassword"
            type={values.showPassword1 ? 'text' : 'password'}
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
             startAdornment= {
            <InputAdornment position="start">
             <VpnKeyIcon style={{ color: grey[600] }}/>
            </InputAdornment>
          }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
    
         <Button
             style={{ color: grey[50],
              backgroundColor:cyan[600],
              fontWeight:"bold", 
              borderRadius:"1rem" , 
              marginTop: "0.8rem",
              padding: "0.5rem",
              marginLeft:"1rem" }}
            className= "loginbtn"
            variant="contained"
            fullWidth
            onClick={Register}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={1} sm={3} md={4}></Grid>
      </Grid>
    </div>
  );
  return (
    <div>
      {loading && <LinearBuffer />}
      {errorMessage && (
        <AlertBar type="error" message={errorMessage} autoClose={6000} />
      )}
      {successMsg && (
        <AlertBar type="success" message={successMsg} autoClose={6000} />
      )}
      {SignUpHeader()}
      {SignUpForm()}
    </div>
  );
};

export default SignUp;
