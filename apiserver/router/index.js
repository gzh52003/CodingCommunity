const goods = require('./goods/goods')
const blog = require('./blog')
const express = require('express')
const session = require("express-session")

const token = require('./utils/token')
const vcode = require('./huihui/vcode')
const cors = require('./filter/cors');
const user = require('./userlist/user')
const router = express.Router()
const {
    formatData
} = require('./utils/tools')
const login = require('./huihui/login')
const reg = require('./huihui/reg');

router.use(express.urlencoded({
    extended: false
}), express.json())

router.use(cors)
// router.use('/user', user)
router.use('/user', user)
router.use('/goods', goods);
router.use('/blog', blog);
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

// 图形验证码
router.use('/vcode', vcode);

module.exports = router