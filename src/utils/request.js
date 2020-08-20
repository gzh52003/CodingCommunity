import axios from 'axios'

const request = axios.create({
    baseURL:'http://localhost:10000/api'
})

export default request