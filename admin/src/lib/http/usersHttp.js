import * as axios from "axios";

const usersHttp = {
  getListUsers: async function (body) {
    const result = await axios.get(`http://localhost:4000/users`, body);
    return result.data;
  },
  loginUser: async function (body) {
    const result = await axios.post(`http://localhost:4000/login`, body);
    return result;
  },
};

export default usersHttp;
