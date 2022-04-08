import { axios } from '../index.js'

export default {
  signUp(signUpParams) {
    return axios.post('/v1/auth',signUpParams)
  }
}