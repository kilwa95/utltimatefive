import * as axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://174.138.4.15:4000"
    : "http://localhost:4000";

const teamsHttp = {
  getListTeams: async function () {
    const result = await axios.get(`${baseURL}/teams`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
  createTeam: async function (body) {
    debugger;
    const result = await axios.post(`${baseURL}/admin/teams`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return result;
  },
};

export default teamsHttp;
