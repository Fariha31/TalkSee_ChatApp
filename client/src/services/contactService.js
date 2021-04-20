import GenericService from "./genericService";
class ContactService extends GenericService {
  constructor() {
    super();
  }
  getAllContact = () => this.get("contact/getContact");
  getSingleContact = (id) => this.get("contact/get-contact/" + id);
  }

let contactService = new ContactService();
export default contactService;