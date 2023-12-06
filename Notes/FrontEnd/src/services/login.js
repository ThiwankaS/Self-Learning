import axios from 'axios'

const baseUrl = '/api/login'

const login = async (cerdentials) => {
  const response = await axios.post(baseUrl,cerdentials)
  return response.data
}

export default { login }