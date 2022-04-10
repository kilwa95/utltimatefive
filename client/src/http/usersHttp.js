import * as axios from 'axios'

const usersHttp = {
  loginUser: async function (body) {
    const result = await axios.post(`http://localhost:4000/login`, body)
    return result
  },
  registerPlayer: async function (body) {
    const result = await axios.post(`http://localhost:4000/players`, body)
    return result
  },
  registerOrganizer: async function (body) {
    const result = await axios.post(`http://localhost:4000/organizers`, body)
    return result
  },
  getUserById: async function () {
    const result = await axios.get(`http://localhost:4000/users/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result
  },
  updateUser: async function (uid) {
    const result = await axios.put(`http://localhost:4000/users/${uid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result
  },
}

export default usersHttp
