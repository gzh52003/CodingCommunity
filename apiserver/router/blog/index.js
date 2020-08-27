const express = require('express')
const router = express.Router()
const blogFind = require('./blogFind')

router.use("/find",blogFind)



module.exports = router

