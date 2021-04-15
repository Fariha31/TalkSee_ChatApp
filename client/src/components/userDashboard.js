import React, { useEffect, useState } from "react";
import Header from "./Header";
import { isAuthenticated } from "../clientStorages/auth";
import { Button } from "@material-ui/core";
const UserDashboard = ( ) => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const myId= isAuthenticated()._id;
   useEffect (()=>{
     setFname(isAuthenticated().firstname);
    setLname(isAuthenticated().lastname);
   },[])
  
  return <div>
    <Header/>
   
    <h1> Hi, {Fname + " " + Lname}</h1>
     <Button className= "loginbtn"
             style={{marginLeft:"20rem" ,display:"block"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  window.location.href='/all-contacts'}> Add New friend</Button>
    <Button className= "loginbtn"
             style={{marginLeft:"20rem",marginTop:"2rem",display:"block"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  window.location.href='/all-my-friends'}> My friend Lists</Button>
     <Button className= "loginbtn"
             style={{marginLeft:"20rem",marginTop:"2rem",display:"block"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  window.location.href='/update-my-profile-setup/'+myId}>Update Profile</Button>
     
      
    </div>
};

export default UserDashboard;
