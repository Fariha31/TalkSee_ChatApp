import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Button,
  FormControlLabel,
  InputAdornment,
  Checkbox,
  Typography
} from "@material-ui/core";
import { grey, cyan} from '@material-ui/core/colors';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import AlertBar from "../Alerts/AlertBar";
import LinearBuffer from "../Alerts/ProgressBar";
import { login } from "../api/auth";
import { authentication, isAuthenticated } from "../clientStorages.js/auth";

const useStyles = makeStyles((theme) => ({
   margin: {
    margin: theme.spacing(2),
  },
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
            history.push("/admin/dashboard");
          else history.push("/user/dashboard");
          setValues({ ...values, loading: false });
        })
        .catch((err) => {
          console.log(err);
          setValues({
            ...values,
            loading: "false",
            errorMessage: err.response.data.errorMessage,
          });
        });
    }
  };
  const LogInHeader = () => (
    <Grid container style={{ marginTop: "7rem" ,marginBottom:"2rem"}}>
      <Grid item xs={1} sm={2} xm={5} md={4}></Grid>
      <Grid item xs={10} sm={8} xm={2} md={4}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Link className="header" to="/login">Sign In</Link>      
          </Grid>
           <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Link className="header" to="/signup">Sign Up</Link>
          </Grid>
          
        </Grid>
          <hr/>
           </Grid>
      <Grid item  xs={1} sm={2} xm={5} md={4}></Grid>
    </Grid>
  );
  const LogInForm = () => (
    <div className="Login-container">
      <Grid container>
        <Grid item xs={1} sm={2} md={4}></Grid>
        <Grid item xs={10} sm={8} md={4}>
           <TextField
           className={classes.margin}
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
          
          <TextField
        className={classes.margin}
         label= {
              <div> 
             <Typography variant="headline" style={{fontWeight:"bold",fontStyle:"italic" }}> Password </Typography>
             <Typography variant="headline" style={{color:"red"}}>*</Typography>
                  </div>
                  }
            id="password-field"
            name="password"
            value={values.password}
             type="password"
            fullWidth
            onChange={handleTextChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <LockIcon style={{ color: grey[600] }}/>
            </InputAdornment>
          ),
        }}
         />
           
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
            Sign In
          </Button>
           
          <hr/>
          <FormControlLabel
          style={{ marginLeft: "0.2rem"}}
          value="end"
          control={<Checkbox color="primary" />}
          label={
             <Typography variant="headline" style ={{fontSize:"0.9rem"  ,marginRight:"0rem"}} > Forgot Password? </Typography>
                  }
          labelPlacement="end"
          />
        </Grid>
        <Grid item xs={1} sm={2} md={4}></Grid>
      </Grid>
    </div>
  );
  return (
    <div>
      {loading && <LinearBuffer />}
      {LogInHeader()}
      {errorMessage && (
        <AlertBar type="error" message={errorMessage} autoClose={5000} />
      )}
      {LogInForm()}
    </div>
  );
};

export default LogIn;
