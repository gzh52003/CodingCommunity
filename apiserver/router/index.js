const comment = require('../')
const express = require('express')

const router = express.Router()

router.use(express.urlencoded({
    extended: false
}), express.json())

router.use('/user', user)
router.use('/comment', comment)
module.exports = router