import axios from 'axios'

const request = axios.create({
<<<<<<< HEAD
    baseURL:'http://localhost:2003/api'
=======
    baseURL: 'http://localhost:10000/api/',
    withCredentials: true

>>>>>>> 891abafd301b354cd65f331087123774a1593b2d
})

export default request