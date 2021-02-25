import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import {
  TextField,
  Grid,
  Button,
  FormControl,
  Input,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputLabel
} from "@material-ui/core";
import { grey, cyan, brown} from '@material-ui/core/colors';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import AlertBar from "../Alerts/AlertBar";
import LinearBuffer from "../Alerts/ProgressBar";
import { login } from "../api/auth";
import { authentication, isAuthenticated } from "../clientStorages.js/auth";

const useStyles = makeStyles((theme) => ({
   textField: {
    margin: theme.spacing(2),
  },
  margin:{
    margin: theme.spacing(2),
    marginLeft:"0.9rem",
  }
}));
const LogIn = () => {
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1)
      history.push("/admin/dashboard");
    else if (isAuthenticated() && isAuthenticated().role === 0)
      history.push("/user/dashboard");
  }, [history]);
  const [values, setValues] = useState({
    email: "",
    password: "",
    errorMessage: "",
    showPassword: false,
    loading: false,
  });
  const { email, password, errorMessage, loading } = values;
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      errorMessage: "",
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
   const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleTextChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
      errorMessage: "",
    });
  };
  const Register = (event) => {
    event.preventDefault();
    if (isEmpty(email) || isEmpty(password)) {
      setValues({ ...values, errorMessage: "Both fields are required" });
    } else if (!isEmail(email)) {
      setValues({ ...values, errorMessage: "Invalid Email" });
    } else {
      setValues({ ...values, loading: true });
      const { email, password } = values;
      const data = { email, password };

      login(data)
        .then((response) => {
          authentication(response.data.token, response.data.user);

          if (isAuthenticated() && isAuthenticated().role === 1)
            history.push("/dashboard");
          else history.push("/dashboard");
          setValues({ ...values, loading: false });
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
  const LogInHeader = () => (
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
  const LogInForm = () => (
    <div className="Login-container">
      <Grid container>
        <Grid item xs={1} sm={3} md={4}></Grid>
        <Grid item xs={10} sm={6} md={4}>
          
           <TextField
           className={classes.textField}
           style={{marginTop:"2rem"}}
            label={
              <div> 
             <Typography variant="headline" style={{fontWeight:"bold",fontStyle:"italic"  }}> Email Address </Typography>
             <Typography variant="headline" style={{color:"red"}}>*</Typography>
                  </div>
                  }
            id="email-field"
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
             <Typography variant="headline" style={{color:"red",marginLeft:"0.4rem"}}>*</Typography>
         </InputLabel>
                    <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            name="password"
            value={values.password}
            onChange={handleChange('password')}
              
          startAdornment= {
            <InputAdornment position="start">
             <VpnKeyIcon style={{ color: grey[600] }}/>
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
         
         <Grid container> 
         <Grid item xs ={6} sm={7} md={8}>
          
         </Grid>
       
          <Grid item xs={6} sm={5} md={4}>
             <Link to="/resetPasscode" style={{textDecoration:"none",marginLeft:"2rem"}}  >Forgot Password?</Link>
          </Grid>
           
            </Grid>
            <Button
             style={{ color: grey[50],
              backgroundColor:cyan[600],
              fontWeight:"bold", 
              borderRadius:"1rem" , 
              marginTop: "1.2rem",
              padding: "0.5rem",
              marginLeft:"1rem" }}
            className= "loginbtn"
            variant="contained"
            fullWidth
            onClick={Register}
          >
            Sign In
          </Button>
           
          <hr style={{ marginLeft:"1rem"}}/>
         
         </Grid>
        
         
        <Grid item xs={1} sm={3} md={4}></Grid>
      </Grid>
    </div>
  );
  return (
    <div>
      {loading && <LinearBuffer />}
     
          {LogInHeader()}
      {LogInForm()}
      
     
      {errorMessage && (
        <AlertBar type="error" message={errorMessage} autoClose={5000} />
      )}
       
    </div>
  );
};

export default LogIn;
