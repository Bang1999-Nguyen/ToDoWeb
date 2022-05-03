import callApi from "../../utils/callApi";

class UserService {
  // response.data.success
  signIn(user) {
    return callApi("auth/login", "POST", user);
  }
}
export default new UserService();
