const express = require('express')
const cors = require('./userlist/cors')
const link = require('./userlist/link')
const router = express.Router()

router.use('/api',link)
// CORS跨域
router.use(cors)
router.use(express.urlencoded({extended:false}),express.json())

// router.use('/user',user)

module.exports = router
