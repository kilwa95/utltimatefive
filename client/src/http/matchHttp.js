import * as axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://174.138.4.15:4000'
    : 'http://localhost:4000'

console.log('process.env.NODE_ENV', process.env)
const matchesHttp = {
  getListMatches: async function () {
    const result = await axios.get(`${baseURL}/matchs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  getListMatchesPlayer: async function () {
    const result = await axios.get(`${baseURL}/matchs/player`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  getMatchByMatchId: async function (mid) {
    const result = await axios.get(`${baseURL}/matchs/${mid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  deleteMatch: async function (mid) {
    const result = await axios.delete(`${baseURL}/matchs/${mid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  updateMatch: async function (mid, body) {
    const result = await axios.put(`${baseURL}/matchs/${mid}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  getListMatchsByUserId: async function (uid) {
    const result = await axios.get(`${baseURL}/matchs/${uid}/organizer`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  saveMatche: async function (body) {
    const result = await axios.post(`${baseURL}/matchs`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  joinMatch: async function (mid) {
    const result = await axios.post(
      `${baseURL}/matchs/${mid}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return result.data
  },
  deletePlayerFromMatch: async function (mid, uid) {
    const result = await axios.delete(
      `${baseURL}/matchs/${mid}/players/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return result
  },
}

export default matchesHttp
