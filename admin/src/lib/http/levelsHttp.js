import * as axios from "axios";

import { baseURL } from "../../config/config";

const levelsHttp = {
  saveLevels: async function (body) {
    const result = await axios.post(`${baseURL}/admin/levels`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
  getLevels: async function () {
    const result = await axios.get(`${baseURL}/levels`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
};

export default levelsHttp;
