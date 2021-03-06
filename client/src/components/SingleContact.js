import { Button, Typography,Paper } from "@material-ui/core";
import { isAuthenticated } from "../clientStorages/auth";
import friendService from "../services/friendService";
import React, { useState} from "react";
import { lightBlue, grey} from '@material-ui/core/colors';
const SingleContact = (props) => {
     
    const { contact } = props;
    var userData=JSON.parse(localStorage.getItem("user")) 
      const [showAddBtn, setAddBtn]=useState(userData.sentRequests.includes(contact._id)?false:true)
     
  
    //const [showAddBtn, setAddBtn]=useState(state?!state.sentRequests.includes(contact._id):true);
    const myId=isAuthenticated()._id;
    const myName =isAuthenticated().firstname + " " +isAuthenticated().lastname;
    const myProfileImg =isAuthenticated().profileImg;
    const myEmail =isAuthenticated().email;
    const myGender =isAuthenticated().gender;
    const myLangPreference =isAuthenticated().langPreference;
    const sentFriendRequest=()=>{
        friendService.sendRequest(
            {friendId:contact._id,
            myId,myName,myProfileImg,myEmail,myGender,myLangPreference})
         .then((data) => {
           localStorage.setItem("user",JSON.stringify(data));
              // dispatch({type:"FRIEND_REQUESTED",payload:{sentRequests:data.sentRequests }})
             setAddBtn(false)
            
            })
         .catch((err) => {console.log(err);});
    }
     const cancelFriendRequest=()=>{
        friendService.cancelRequest(
            {friendId:contact._id,myId})
         .then((data) => {
             localStorage.setItem("user",JSON.stringify(data));
            // dispatch({type:"FRIEND_REQUESTED",payload:{sentRequests:data.sentRequests }})
             setAddBtn(true)
             
         })
         .catch((err) => {console.log(err);});
    }
    return (
        <div>
       <Paper style={{padding: '10px 20px', marginBottom:"2rem"}} >
              <img src={contact.profileImg}  className="img-fluid rounded-circle p-2"
          style={{ width: "4.9em" ,display:"inline" }}/>
              <h4   style={{display:"inline"  }}>{contact.firstname + " "+ contact.lastname}</h4>
        {showAddBtn ?  
         <Button className= "loginbtn"
             style={{display:"inline-block"  ,position:"relative",float:"right",marginTop:"1rem", backgroundColor:lightBlue[600],color:"white"}}
            variant="contained" 
            onClick={sentFriendRequest}>Add friend</Button>
        : 
        <Button className= "loginbtn"
              style={{display:"inline-block" ,position:"relative",float:"right" ,marginTop:"1rem", backgroundColor:grey[500],color:"white"}}
            variant="contained" 
            onClick={cancelFriendRequest}>Requested</Button> 
             }
        <Typography style={{color:"gray",marginLeft:"5rem" ,  fontStyle: "italic" , fontSize:"0.9rem" }}>{contact.email}</Typography>
     </Paper> 
   
          
   
    </div>);
}
 
export default SingleContact;