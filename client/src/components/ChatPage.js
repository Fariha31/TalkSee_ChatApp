import { Button } from "@material-ui/core";
import React from "react"
const ChatPage = () => {
    return ( 
    <div> 
        <Button className= "loginbtn"
            variant="outlined" 
            size="medium"
            color="Primary"
            onClick={event =>  window.location.href='/dashboard'} 
            >Back to dashboard</Button>
            <h1>Chat Page</h1></div> );
}
 
export default ChatPage;