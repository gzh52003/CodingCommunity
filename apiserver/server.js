const express = require('express')
const {PORT} = require('./config.json')
const allRouter = require('./router')
const link = require('../apiserver/router/userlist/link')
const app = express()
app.use("/api",link)
// 获取商品路由
// app.use('/api',allRouter)

app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`)
})