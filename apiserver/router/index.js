const comment = require('./comment/comment')
const express = require('express')
const cors = require('./filter/cors');
const router = express.Router()

const user = require("./user")
const login = require('./huihui/login')
const reg = require('./huihui/reg');
const {
    route
} = require('./comment/comment');

router.use(express.urlencoded({
    extended: false
}), express.json())

router.use(cors)
// router.use('/user', user)

router.use('/comment', comment);
router.use('/asd', user);
router.use('/login', login);
router.use('/reg', reg);




module.exports = router