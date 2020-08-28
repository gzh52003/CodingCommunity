import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:10000/api/',
    withCredentials: true

})

export default request