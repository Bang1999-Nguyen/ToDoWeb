import callApi from "../../utils/callApi";

class ToDoService {
  // response.data.success
  getToDoList(token) {
    return callApi("post", "GET", null, token);
  }
  createToDo(todo, token) {
    return callApi("post", "POST", todo, token);
  }
}
export default new ToDoService();
