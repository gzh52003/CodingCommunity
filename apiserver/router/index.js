const comment = require('./comment/comment')
const express = require('express')
const token = require('./utils/token')

const cors = require('./filter/cors');
const router = express.Router()
const {
    formatData
} = require('./utils/tools')
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
//注册登入
router.use('/login', login);
router.use('/reg', reg);
// 校验token
router.get('/jwtverify', (req, res) => {
    const {
        authorization
    } = req.query;

    let author = "";
    if (authorization) {
        author = JSON.parse(authorization).authorization;
        console.log("authorization=", authorization);
    }

    if (token.verify(author)) {
        res.send(formatData())
    } else {
        res.send(formatData({
            code: 0
        }))
    }
});



module.exports = router