import * as axios from 'axios'
import { baseURL } from '../config/config'

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
