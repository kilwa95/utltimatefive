import * as axios from "axios";

const matchesHttp = {
  getListMatches: async function () {
    const result = await axios.get(`http://localhost:4000/matchs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
};

export default matchesHttp;
