import callApi from "../../utils/callApi";

class UserService {
  // response.data.success
  signIn(user) {
    return callApi("auth/login", "POST", user);
  }
  signUp(user) {
    return callApi("auth/register", "POST", user);
  }
  getUserProfile(token) {
    return callApi("auth/profile", "GET", null, token);
  }
}
export default new UserService();
