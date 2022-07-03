import * as axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://174.138.4.15:4000"
    : "http://localhost:4000";

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
