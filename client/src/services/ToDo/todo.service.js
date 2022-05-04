import callApi from "../../utils/callApi";

class ToDoService {
  // response.data.success
  getToDoList(token) {
    return callApi("post", "GET", null, token);
  }
  createToDo(todo, token) {
    return callApi("post", "POST", todo, token);
  }
  updateToDo(id, todo, token) {
    return callApi(`post/${id}`, "PUT", todo, token);
  }
  deleteToDo(id, token) {
    return callApi(`post/${id}`, "DELETE", null, token);
  }
}
export default new ToDoService();
