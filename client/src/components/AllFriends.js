import React, { useEffect } from "react";
import SingleFriend from "./SingleFriend";
import friendService from "../services/friendService";
import { Button, Grid } from "@material-ui/core";
import PageTitle from "./pageTitle";
import { isAuthenticated } from "../clientStorages/auth";
import { useHistory } from 'react-router-dom';
import Header from "./Header";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

 
const AllFriends = () => {
     const myId=isAuthenticated()._id;
      let history = useHistory();
     
     const [friends, setFriends] =React.useState([]);
     const getAllMyFriends = () => 
     {
       friendService.getAllFriends(myId)
        .then((data)=>{
         setFriends(data);})
      .catch((err=>{console.log(err)}))
   
     }
    useEffect(getAllMyFriends , []);
 
  
     return ( 
    <div>
      <Header/>
      <PageTitle name= {"My Friends"}/>
     {
      friends.length === 0 ? 
        ( <div style= {{textAlign: "center",
    padding: "6rem", fontWeight:"bold"}}>No Friend Found</div>) 
        :
        (
        <Grid container   style={{marginTop:"3rem", display :"flex"}}>
          <Grid item xs ={1} md={3}> </Grid>
          <Grid item xs ={10} md={6}>
          {
          friends.map((friend, index) => (
               <SingleFriend key={index} friend={friend} onRemove={getAllMyFriends} /> )
          )}
            <Button
        color="primary"
        aria-label="add"
        variant="outlined"
        style={{textTransform:"capitalize",float:"right"}}
        onClick={event => history.push('/all-contacts')}
      >
        <PersonAddIcon style={{marginRight:"0.2rem",fontSize:"1.6rem"}} />Add New Friend
      </Button>
          </Grid>
          <Grid item xs={1}   md={3}></Grid>
        </Grid>
         )
         
      }
      
 
    </div> );

}
export default AllFriends;