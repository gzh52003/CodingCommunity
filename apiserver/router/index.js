const comment = require('./comment/comment')
const blog = require('./blog')
const express = require('express')
const cors = require('./filter/cors')
const router = express.Router()


router.use(express.urlencoded({
    extended: false
}), express.json())

router.use(cors)
// router.use('/user', user)

router.use('/comment', comment);
router.use('/blog', blog);


module.exports = router