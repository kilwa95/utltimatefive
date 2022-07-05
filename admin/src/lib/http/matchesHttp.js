import * as axios from "axios";

import { baseURL } from "../../config/config";

const matchesHttp = {
  getListMatches: async function () {
    const result = await axios.get(`${baseURL}/matchs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
};

export default matchesHttp;
