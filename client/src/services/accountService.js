import GenericService from "./genericService";
class AccountService extends GenericService {
  constructor() {
    super();
  }
   accountActivation = (data) => this.post("auth/activation", data);
   forgotPassword = (data) => this.put("auth/forgot-password", data);
   resetPassword = (data) => this.put("auth/reset-password", data);
   profileSetup =(data)=>this.post("auth/profile-setup",data);
   updateProfileSetup = (_id, data) =>this.put("auth/update-profile-setup/" + _id, data);
   getMyAccount =(id) => this.get("auth/my-account/" + id);
}
let accountService = new AccountService();
export default accountService;