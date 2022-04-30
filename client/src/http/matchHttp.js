import * as axios from 'axios'

const matchesHttp = {
  getListMatches: async function () {
    const result = await axios.get(`http://localhost:4000/matchs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  getMatchByMatchId: async function (mid) {
    const result = await axios.get(`http://localhost:4000/matchs/${mid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  getListMatchsByUserId: async function (uid) {
    const result = await axios.get(
      `http://localhost:4000/matchs/${uid}/organizer`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return result.data
  },
  saveMatche: async function (body) {
    const result = await axios.post(`http://localhost:4000/matchs`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
  joinMatch: async function (mid) {
    const result = await axios.post(
      `http://localhost:4000/matchs/${mid}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return result.data
  },
}

export default matchesHttp
