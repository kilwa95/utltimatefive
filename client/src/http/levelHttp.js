import * as axios from 'axios'

const levelHttp = {
  getListLevels: async function () {
    const result = await axios.get(`http://localhost:4000/levels`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return result.data
  },
}

export default levelHttp
