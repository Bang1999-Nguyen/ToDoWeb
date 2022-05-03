import axios from "axios";
import { BASE_URL } from "../constants/apiConfig";

const callApi = (endpoint, method, data = null, token = null) => {
  return axios({
    url: `${BASE_URL}/${endpoint}`,
    method,
    data,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : null,
  });
};

export default callApi;
