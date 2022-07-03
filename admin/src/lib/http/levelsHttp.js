import * as axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://174.138.4.15:4000"
    : "http://localhost:4000";

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
