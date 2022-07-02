import * as axios from "axios";

const teamsHttp = {
  getListTeams: async function () {
    const result = await axios.get(`http://localhost:4000/teams`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
  createTeam: async function (body) {
    debugger;
    const result = await axios.post(`http://localhost:4000/admin/teams`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return result;
  },
};

export default teamsHttp;