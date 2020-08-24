const comment = require('./comment/comment')
const express = require('express')
const cors = require('./filter/cors');
const user = require('./userlist/user')
const router = express.Router()


router.use(express.urlencoded({
    extended: false
}), express.json())

router.use(cors)
// router.use('/user', user)
router.use('/user',user)
router.use('/comment', comment);



module.exports = router