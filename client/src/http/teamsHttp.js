import * as axios from 'axios'

import { baseURL } from '../config/config'

const teamsHttp = {
  getListTeams: async function () {
    const result = await axios.get(`${baseURL}/teams`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  joinTeam: async function (tid, uid) {
    const result = await axios.post(
      `${baseURL}/teams/${tid}/join`,
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
