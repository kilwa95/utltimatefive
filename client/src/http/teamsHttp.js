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
}

export default teamsHttp
