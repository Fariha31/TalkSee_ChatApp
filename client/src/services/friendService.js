import GenericService from "./genericService";
class FriendService extends GenericService {
  constructor() {
    super();
  }
  sendRequest   = (data) => this.post("friend/send-friend-request", data);
  cancelRequest = (data) => this.post("friend/cancel-friend-request", data);
  acceptRequest = (data) => this.post("friend/accept-friend-request", data);
  rejectRequest = (data) => this.post("friend/reject-friend-request", data);
  deleteFriend  = (data) => this.post("friend/delete-friend", data);
  getFriendRequest =(id) =>  this.get("friend/my-friend-requests/" + id);
  getSentFriendRequest =(id) =>  this.get("friend/sent-friend-requests/" + id);
 
}

let friendService = new FriendService();
export default friendService;