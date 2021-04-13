import React, { useEffect } from "react";
import SingleContact from "./SingleContact";
import contactService from "../services/contactService";
import { Button, Grid } from "@material-ui/core";
import friendService from "../services/friendService";
import PageTitle from "./pageTitle";
import { isAuthenticated } from "../clientStorages/auth";
const AllContact = () => {
    const myId=isAuthenticated()._id;
    const [contacts, setContacts] = React.useState([]);

    const getFriendRequest = () => {
   friendService.getSentFriendRequest(myId)
   .then((data)=>{
      localStorage.setItem("user",JSON.stringify(data));})
   .catch((err=>{console.log(err)}))
   }
    
    const getAllContacts = () => {
    contactService.getAllContact()
    .then((data) => { setContacts(data);})
    .catch((err) => {console.log(err);});
  };
   useEffect(()=> {
     getFriendRequest();
     getAllContacts()}, []);
    
   
    return ( 
    <div>
      <PageTitle name= {"TalkSee User"}/>
     {
      contacts.length === 0 ? 
        ( <div style= {{textAlign: "center",
    padding: "6rem", fontWeight:"bold"}}>No one using TalkSee</div>) 
        :
        (
        <Grid container  style={{marginTop:"3rem"}}>
          <Grid item xs ={1} md={3}> </Grid>
          <Grid item xs ={10} md={6}>
          {
            
          contacts.map((contact, index) => {
              return contact._id === myId ? (
              <div >
               
            </div>
     )
            : <SingleContact key={index} contact={contact}    />} )
          }
          </Grid>
          <Grid item xs={1}   md={3}></Grid>
        </Grid>
         )
         
      }
      <Button className= "loginbtn"
             style={{marginLeft:"20rem"}}
            variant="contained" 
            onClick={event =>  window.location.href='/all-friend-requests'}> Friend requests</Button>
    </div> );
}
 
export default AllContact;