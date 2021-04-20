import React from "react";
import Header from "./Header";
import { isAuthenticated } from "../clientStorages/auth";
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

const UserDashboard = ( ) => {
   let history = useHistory()
  const myId= isAuthenticated()._id;
    
  
  return <div>
    <Header/>
     <Button className= "loginbtn"
             style={{marginLeft:"20rem" ,display:"block"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  history.push('/all-contacts')}> Add New friend</Button>
    <Button className= "loginbtn"
             style={{marginLeft:"20rem",marginTop:"2rem",display:"block"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  history.push('/all-my-friends')}> My friend Lists</Button>
     <Button className= "loginbtn"
             style={{marginLeft:"20rem",marginTop:"2rem",display:"block"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  history.push('/update-my-profile-setup/'+myId)}>Update Profile</Button>
     
      
    </div>
};

export default UserDashboard;
