import React, { useEffect, useState } from "react";
import Header from "./Header";
import { isAuthenticated } from "../clientStorages/auth";
import { Button } from "@material-ui/core";
const UserDashboard = ( ) => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
   useEffect (()=>{
     setFname(isAuthenticated().firstname);
    setLname(isAuthenticated().lastname);
   },[])
  
  return <div>
    <Header/>
   
    <h1> Hi, {Fname + " " + Lname}</h1>
     <Button className= "loginbtn"
             style={{marginLeft:"20rem"}}
            variant="contained" 
            onClick={event =>  window.location.href='/all-contacts'}> Add New friend</Button>
   
      
    </div>
};

export default UserDashboard;
