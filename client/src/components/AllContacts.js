import React, { useEffect,useState } from "react";
import SingleContact from "./SingleContact";
import contactService from "../services/contactService";
import { Button, Grid ,InputAdornment, TextField} from "@material-ui/core";
import friendService from "../services/friendService";
import PageTitle from "./pageTitle";
import { isAuthenticated } from "../clientStorages/auth";
import {  useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Header from "./Header";
import { grey } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
 
const AllContact = () => {
    const myId=isAuthenticated()._id;
    let history = useHistory()
    const [contacts, setContacts] = React.useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const onChangeSearch = (event) => 
        setSearchTerm(event.currentTarget.value)
    const getData = () => {
   friendService.getSentFriendRequest(myId)
   .then((data)=>{
      localStorage.setItem("user",JSON.stringify(data));})
   .catch((err=>{console.log(err)}))
   }
     
  const getSingleContact = () => {
    contactService.getSingleContact(myId)
    .then((data) => { setContacts(data);})
    .catch((err) => {console.log(err);});
  };

   useEffect(()=> {
     getData();
     getSingleContact();
 }, []);
    
   
    return ( 
    <div>
      <Header/>
      <PageTitle name= {"Add Friend"}/>
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
      contacts.length === 0 ? 
        ( <div style= {{textAlign: "center",
    padding: "6rem", fontWeight:"bold"}}>No User Found</div>) 
        :(
            <Grid container  style={{marginTop:"3rem"}}>
          <Grid item xs ={1} md={3}> </Grid>
          <Grid item xs ={10} md={6}>
     
           { 
           contacts.filter((contact)=>{
             if(searchTerm == "") return contact
             else if (contact.firstname.toLowerCase().startsWith(searchTerm.toLowerCase()) || contact.lastname.toLowerCase().startsWith(searchTerm.toLowerCase()) )
                return contact
           }).map((contact, index) => {
              return contact._id === myId ? 
              <div >
              {/*  Hey <span  style= {{textAlign: "center",padding: "4rem"}}style ={{fontWeight:"bold"}}> {contact.firstname + " " + contact.lastname}</span> , All users are your Friends <Link style ={{ fontWeight:"normal"}} to="/all-my-friends" >Click here</Link>
             */}  </div>
            : <SingleContact key={index} contact={contact}/>
            } )
          }
           </Grid>
          <Grid item xs={1}   md={3}></Grid>
        </Grid>)}
      )
          <Grid container   style={{display:"flex",marginBottom:"1rem"}}>
          <Grid item xs ={1} md={3}> </Grid>
          <Grid item xs ={10} md={6}>
       <Button className= "loginbtn"
            style={{textTransform:"capitalize",float:"right"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  history.push('/all-friend-requests')}> My Friend Requests</Button>
        
        <Button className= "loginbtn"
            style={{textTransform:"capitalize",float:"left"}}
            variant="outlined" 
            color="Primary"
            onClick={event =>  history.push('/dashboard')}><ArrowBackIcon/> Back
            </Button>
         </Grid>
       <Grid item xs ={1} md={3}> </Grid>
       </Grid>
   
      
      
    </div> );
}
 
export default AllContact;