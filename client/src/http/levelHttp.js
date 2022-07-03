import * as axios from 'axios'
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://174.138.4.15:4000'
    : 'http://localhost:4000'
const levelHttp = {
  getListLevels: async function () {
    const result = await axios.get(`${baseURL}/levels`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
}

export default levelHttp
