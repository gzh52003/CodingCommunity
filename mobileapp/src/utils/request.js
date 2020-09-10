import axios from 'axios'


const request = axios.create({
    baseURL: 'http://47.100.56.31:10000/api/',
    withCredentials: true
})

export default request