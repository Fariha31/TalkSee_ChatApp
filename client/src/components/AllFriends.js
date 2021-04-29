import React, { useEffect,useState } from "react";
import SingleFriend from "./SingleFriend";
import friendService from "../services/friendService";
import { Button, Grid,InputAdornment, TextField  } from "@material-ui/core";
import PageTitle from "./pageTitle";
import { isAuthenticated } from "../clientStorages/auth";
import { useHistory } from 'react-router-dom';
import Header from "./Header";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
 
const AllFriends = () => {
    const myId=isAuthenticated()._id;
    let history = useHistory();
    const [friends, setFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const onChangeSearch = (event) => 
        setSearchTerm(event.currentTarget.value)

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
       <Grid container   style={{display:"flex" ,marginTop:"1.8rem",justifyContent:"center"}}>
          <Grid item xs ={1} md={5}> </Grid>
          <Grid item xs ={10} md={4}  >
            <TextField
                value={searchTerm}
                onChange={onChangeSearch}
                placeholder="Search By Name..."
                variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
             <SearchIcon style={{ color: grey[600] ,marginRight:"0.4rem",float:"right"}}/>
            </InputAdornment>
          ),
         }}
            />
            </Grid>
              <Grid item xs ={1} md={4}> </Grid>
            </Grid>
          
   
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
          friends.filter((friend)=>{
             if(searchTerm == "") return friend
             else if (friend.name.toLowerCase().istartsWith(searchTerm.toLowerCase()))
                return friend
           }).map((friend, index) => (
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
      <Button className= "loginbtn"
            style={{textTransform:"capitalize",float:"left"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  history.push('/dashboard')}><ArrowBackIcon/> Back
            </Button>
          </Grid>
          <Grid item xs={1}   md={3}></Grid>
        </Grid>
         )
         
      }
      
 
    </div> );

}
export default AllFriends;