import * as axios from "axios";

const usersHttp = {
  getListUsers: async function () {
    const result = await axios.get(`http://localhost:4000/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
  loginUser: async function (body) {
    const result = await axios.post(`http://localhost:4000/login`, body);
    return result;
  },
};

export default usersHttp;
