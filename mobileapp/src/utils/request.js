import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:10000/api/' : 'http://47.100.56.31:10000/api/'

const request = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

export default request