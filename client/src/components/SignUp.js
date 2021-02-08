import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  FilledInput,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
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
  heading: {
    fontStyle: "cursive",
    color: "secondary",
    padding: "1rem",
  },
  textfield: {
    marginTop: theme.spacing(2),
  },
  SignUpbtn: {
    marginTop: "0.4rem",
  },
}));
const SignUp = () => {
  const classes = useStyles();
  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1)
      history.push("/admin/dashboard");
    else if (isAuthenticated() && isAuthenticated().role === 0)
      history.push("/user/dashboard");
  }, [history]);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
    successMsg: "",
    showPassword: false,
    showPassword1: false,
    loading: false,
  });
  const {
    username,
    email,
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
  const handleClickShowPassword1 = () => {
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
      isEmpty(username) ||
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
      const { username, email, password } = values;
      const data = { username, email, password };
      setValues({ ...values, loading: true });
      signup(data)
        .then((response) => {
          setValues({
            ...values,
            username: "",
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
            loading: "false",
            errorMessage: err.response.data.errorMessage,
          });
        });
    }
  };
  const SignUpHeader = () => (
    <Grid container style={{ marginTop: "0.6rem" }}>
      <Grid item xm={5} md={4}></Grid>
      <Grid item xm={2} md={4}>
        <h2 className={classes.heading}>SignUp</h2>
      </Grid>
      <Grid item xm={5} md={4}></Grid>
    </Grid>
  );
  const SignUpForm = () => (
    <div className="signup-container">
      <Grid container>
        <Grid item xs={1} md={4}></Grid>
        <Grid item xs={10} md={4}>
          <TextField
            className={classes.textfield}
            id="filled-start-adornment"
            value={values.username}
            label="Username"
            name="username"
            variant="filled"
            fullWidth
            onChange={handleTextChange}
          />
          <TextField
            className={classes.textfield}
            label="Email"
            id="filled-start-adornment1"
            name="email"
            value={values.email}
            fullWidth
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl variant="filled" fullWidth noValidate>
            <InputLabel
              style={{ padding: "1rem", paddingLeft: "0" }}
              htmlFor="filled-adornment-password"
            >
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              name="password"
              type={values.showPassword ? "text" : "password"}
              fullWidth
              className={classes.textfield}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="filled" fullWidth noValidate>
            <InputLabel
              style={{ padding: "1rem", paddingLeft: "0" }}
              htmlFor="filled-adornment-password"
            >
              Confirm Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-confirmPassword"
              name="confirmPassword"
              type={values.showPassword1 ? "text" : "password"}
              fullWidth
              className={classes.textfield}
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            className={classes.SignUpbtn}
            variant="contained"
            color="secondary"
            fullWidth
            onClick={Register}
          >
            SignUp
          </Button>
          <p style={{ padding: "1rem" }}>
            Already have an Account?
            <Link to="/login">Log In</Link>
          </p>
        </Grid>
        <Grid item xs={1} md={4}></Grid>
      </Grid>
    </div>
  );
  return (
    <div>
      {loading && successMsg && <LinearBuffer />}
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
