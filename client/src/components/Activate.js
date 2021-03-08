import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { grey,green, cyan,red, brown} from '@material-ui/core/colors';
import {Button, Grid, Typography} from "@material-ui/core";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import TalkSeeTitle from "./TalkSeeTitle";
const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    token: '',
    errorMessage: "",
    successMsg: "",
  });
   const { firstname,lastname, token, errorMessage, successMsg} = formData;
   
  useEffect(() => {
    let token = match.params.token;
    let { firstname } = jwt.decode(token);
    let { lastname } = jwt.decode(token);
    if (token) {
      setFormData({ ...formData, firstname,lastname,  token });
       
      axios
      .post("http://localhost:5000/api/auth/activation", {token})
      .then(response => {
        setFormData({
          ...formData,
          errorMessage: false,
          successMsg: response.data.successMessage,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
        });
       
      })
      .catch(err => {
        
      setFormData({
          ...formData,
          successMsg: false,
         errorMessage: err.response.data.errorMessage,
          firstname: err.response.data.firstname,
          lastname: err.response.data.lastname,
        });
      });
    }}, [match.params]);
     
  
  const ActivationSuccess=()=>(
<div> 
  <Grid container > 
 <Grid item xs={1} sm={3} md={4}></Grid>
  <Grid item xs={1} sm={3} md={4}> 
  
      <p><strong>Hi {firstname +" "+lastname}</strong></p>
        <div>  <CheckCircleRoundedIcon 
              style = {{ color: green[600],paddingTop:"0.3rem" }}/>  
           <span style ={{fontSize:"1.3rem"}} > Your account has been successfully verified. Click below to create your profile</span></div>
      <Button
             style={{ 
               color: grey[50],
              backgroundColor:cyan[600],
              fontWeight:"bold", 
              borderRadius:"1rem" , 
              marginTop: "0.8rem",
              padding: "0.5rem" }}
              variant="contained"
              className= "loginbtn"
              onClick={event =>  window.location.href='/login'}
             
          >
            Create Profile
          </Button>
          </Grid>
          <Grid item xs={1} sm={3} md={4}></Grid>
          </Grid>
   </div>


  );
   const ActivationFailure=()=>(
<div> 
  <Grid container > 
 <Grid item xs={1} sm={3} md={4}></Grid>
  <Grid item xs={1} sm={3} md={4}> 
  
      <p><strong>Hi {firstname+" "+lastname}</strong></p>
        <div>  <CancelRoundedIcon 
              style = {{ color: red[600]  }}/>  
           <span style ={{fontSize:"1.3rem"}} > <strong>{errorMessage}</strong> </span></div>
      <Button
             style={{ 
               color: grey[50],
              backgroundColor:cyan[600],
              fontWeight:"bold", 
              borderRadius:"1rem" , 
              marginTop: "0.8rem",
              padding: "0.5rem" }}
            variant="contained"
             className= "loginbtn"
            onClick={event =>  window.location.href='/signup'}
             
          >
               Try  Again   
          </Button>
          </Grid>
          <Grid item xs={1} sm={3} md={4}></Grid>
          </Grid>
   </div>


  );
  return (
  <div>
        <TalkSeeTitle/>
       {errorMessage && ( ActivationFailure())}
       {successMsg && (ActivationSuccess())}
  </div>)
      }
export default Activate;