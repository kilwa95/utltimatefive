import * as axios from 'axios'

const teamsHttp = {
  getListTeams: async function () {
    const result = await axios.get(`http://localhost:4000/teams`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  joinTeam: async function (tid, uid) {
    const result = await axios.post(
      `http://localhost:4000/teams/${tid}/join`,
      { uid },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return result.data
  },
}

export default teamsHttp
