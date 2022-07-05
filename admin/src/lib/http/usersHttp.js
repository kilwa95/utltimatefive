import * as axios from "axios";

import { baseURL } from "../../config/config";

const usersHttp = {
  getListUsers: async function () {
    const result = await axios.get(`${baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
  loginUser: async function (body) {
    const result = await axios.post(`${baseURL}/login`, body);
    return result;
  },
};

export default usersHttp;
