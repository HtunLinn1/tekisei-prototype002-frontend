import { axios } from '../index.js'

export default {
  signUp(signUpParams) {
    return axios.post('/v1/auth',signUpParams)
  },

  getUsers() {
    return axios.get('/v1/users')
  },

  deleteUser(userId) {
    return axios.delete(`/v1/users/${userId}`)
  }
}