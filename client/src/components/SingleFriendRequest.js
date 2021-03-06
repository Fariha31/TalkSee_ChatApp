import { Button,Paper,  } from "@material-ui/core";
import { isAuthenticated } from "../clientStorages/auth";
import friendService from "../services/friendService";
import { lightBlue,grey} from '@material-ui/core/colors';
const SingleFriendRequest = (props) => {
      const { friendreq ,onAcceptReject} = props;
      const myId=isAuthenticated()._id;
      const myName =isAuthenticated().firstname + " " +isAuthenticated().lastname;
      const myProfileImg =isAuthenticated().profileImg;
      const myEmail = isAuthenticated().email;
      const myGender =isAuthenticated().gender;
      const myLangPreference =isAuthenticated().langPreference;
      const RejectFriendRequest =()=>{
         friendService.rejectRequest({friendId: friendreq.id, myId}) 
          .then((data) => {
             localStorage.setItem("user",JSON.stringify(data));
             onAcceptReject();
             })
         .catch((err) => {console.log(err);});
      } 

        const AcceptFriendRequest =()=>{
         friendService.acceptRequest({
         friendId: friendreq.id,
         friendName:friendreq.name,
         friendProfileImg:friendreq.profileImg, 
          chatId:friendreq.email +"/"+myEmail,
          friendEmail:friendreq.email,
          friendGender:friendreq.gender,
          friendLangPreference:friendreq.langPreference,
          myId,myName,myProfileImg,myEmail,myGender,myLangPreference }) 
          .then((data) => {
           
             localStorage.setItem("user",JSON.stringify(data));
             onAcceptReject()
             })
         .catch((err) => {console.log(err);});
      } 

      return (
          <div>
       <Paper style={{padding: '10px 24px',marginBottom:"2rem"}} >
              <img src={friendreq.profileImg}  className="img-fluid rounded-circle p-2"
          style={{ width: "4.9em" ,display:"inline" }}/>
           <h4   style={{display:"inline" }}>{friendreq.name}</h4>
           <div style={{display:"inline-flex",justifyContent:"space-between", position:"relative", float:"right",width: "200px",height: "auto",marginTop:"0.8rem"}}>
            <Button className= "loginbtn"
              style={{ backgroundColor:lightBlue[700],color:"white"}}
            variant="contained" 
            size="medium" 
            onClick ={AcceptFriendRequest} 
            >Accept</Button>
            <Button className= "loginbtn"
             style={{  backgroundColor:grey[600],color:"white" }}
            variant="contained" 
            onClick ={RejectFriendRequest} 
            >Reject</Button>
            
           
          </div>
          
           </Paper>
            <hr/>
     </div>
      )
}
export default SingleFriendRequest;