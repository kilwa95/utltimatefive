import * as axios from "axios";

const levelsHttp = {
  saveLevels: async function (body) {
    const result = await axios.post(
      `http://localhost:4000/admin/levels`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return result.data;
  },
  getLevels: async function () {
    const result = await axios.get(`http://localhost:4000/levels`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return result.data;
  },
};

export default levelsHttp;
