import React,{useState} from "react";
import axios from 'axios';
import {Grid,Button, Typography, InputAdornment,TextField} from "@material-ui/core";
import { grey, cyan, brown} from '@material-ui/core/colors';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import LinearBuffer from "../Alerts/ProgressBar";
import AlertBar from "../Alerts/AlertBar";
import EmailIcon from '@material-ui/icons/Email';
import TalkSeeTitle from "./TalkSeeTitle";

 
const ForgotPassword = () => {
      
 const [values, setValues] = useState({
    email: "",
    errorMessage: "",
    successMsg:"",
    loading: false,
  });
  const { email, successMsg, errorMessage, loading } = values;

 const handleTextChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
      errorMessage: "",
      successMsg: "",
    });
  };
  const VerifyEmail = (event) => {
    event.preventDefault();
    if (isEmpty(email)   ) {
      setValues({ ...values, errorMessage: "Field is required" });
    } else if (!isEmail(email)) {
      setValues({ ...values, errorMessage: "Invalid Email  syntax" });
    } else {
      const { email} = values;
      const data = {  email};
      setValues({ ...values, loading: true });
        axios.put("http://localhost:5000/api/auth/forgotPassword",data)
        .then((response) => {
          setValues({
            ...values,
            email: "",
            errorMessage: false,
            successMsg: response.data.successMessage,
            loading: false,
          });
        })
        .catch((err) => {
          setValues({
            ...values,
            loading: false,
            email: "",
            successMsg:false,
            errorMessage: err.response.data.errorMessage,
          });
        });
    }
  };
 
const ResetPageForm = () =>(
<div>
    <Grid container>
          <Grid item xs={1} sm={3} md={4}></Grid>
          <Grid item xs={10} sm ={6} md={4}>
              <TextField
            style={{marginTop:"2rem"}}
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
          <Button
             style={{ color: grey[50],
              backgroundColor:cyan[600],
              fontWeight:"bold", 
              borderRadius:"1rem" , 
              marginTop: "1.5rem",
              padding: "0.5rem",
               }}
            className= "loginbtn"
            variant="contained"
            fullWidth
            onClick={VerifyEmail}
          >
            Verify Email Address
          </Button>
          </Grid>
          <Grid item xs={1} sm={3} md={4}></Grid>
    </Grid>
</div>
)
return (<div>
    
    {loading && <LinearBuffer />}
     <TalkSeeTitle/>
      {errorMessage && (
        <AlertBar type="error" message={errorMessage} autoClose={5000} />
      )}
      {successMsg && (
        <AlertBar type="success" message={successMsg} autoClose={5000} />
      )}
      {ResetPageForm()}
    </div>
    )
};

export default ForgotPassword;
