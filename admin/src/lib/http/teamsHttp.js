import * as axios from "axios";

import { baseURL } from "../config/config";

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
