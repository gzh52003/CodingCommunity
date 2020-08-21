const express = require('express')
const
const router = express.Router()

router.use(express.urlencoded({
    extended: false
}), express.json())

router.use('/user', user)

router.use('/comment', )

module.exports = router