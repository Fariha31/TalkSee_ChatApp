import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
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
import AlertBar from "../Alerts/AlertBar";
import LinearBuffer from "../Alerts/ProgressBar";
import { login } from "../api/auth";
import { authentication, isAuthenticated } from "../clientStorages.js/auth";

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
    email: "fariha@gmail.com",
    password: "1234567",
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
    <Grid container style={{ marginTop: "0.6rem" }}>
      <Grid item xm={5} md={4}></Grid>
      <Grid item xm={2} md={4}>
        <h2 className={classes.heading}>Login</h2>
      </Grid>
      <Grid item xm={5} md={4}></Grid>
    </Grid>
  );
  const LogInForm = () => (
    <div className="Login-container">
      <Grid container>
        <Grid item xs={1} md={4}></Grid>
        <Grid item xs={10} md={4}>
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

          <Button
            className={classes.SignUpbtn}
            variant="contained"
            color="secondary"
            fullWidth
            onClick={Register}
          >
            LogIn
          </Button>
          <p style={{ padding: "1rem" }}>
            Don't have an Account?
            <Link to="/signup">SignUp</Link>
          </p>
        </Grid>
        <Grid item xs={1} md={4}></Grid>
      </Grid>
    </div>
  );
  return (
    <div>
      {loading && <LinearBuffer />}
      {LogInHeader()}
      {errorMessage && (
        <AlertBar type="error" message={errorMessage} autoClose={6000} />
      )}
      {LogInForm()}
    </div>
  );
};

export default LogIn;
