import * as axios from 'axios'
import { baseURL } from '../config/config'

const usersHttp = {
  loginUser: async function (body) {
    const result = await axios.post(`${baseURL}/login`, body)
    return result
  },
  registerPlayer: async function (body) {
    const result = await axios.post(`${baseURL}/players`, body)
    return result
  },
  registerOrganizer: async function (body) {
    const result = await axios.post(`${baseURL}/organizers`, body)
    return result
  },
  getUserById: async function () {
    const result = await axios.get(`${baseURL}/users/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result
  },
  updateUser: async function (uid, values) {
    const result = await axios.put(`${baseURL}/users/${uid}`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result
  },
  validerPlayer: async function (uid) {
    const result = await axios.patch(
      `${baseURL}/users/${uid}/validated`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    return result
  },
}

export default usersHttp
