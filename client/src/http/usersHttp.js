import * as axios from 'axios'

const usersHttp = {
  loginUser: async function (body) {
    const result = await axios.post(`http://localhost:4000/login`, body)
    return result
  },
  registerUser: async function (body) {
    const result = await axios.post(`http://localhost:4000/users`, body)
    return result
  },
}

export default usersHttp
