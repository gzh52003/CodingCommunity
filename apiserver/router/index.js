const goods = require('./goods/goods')
const blog = require('./blog')
const express = require('express')
const session = require("express-session")
const order = require('./order/order')
const token = require('./utils/token')
const vcode = require('./huihui/vcode')
const cors = require('./filter/cors');
const user = require('./userlist/user')
const Sms = require('./huihui/sendSms')
const trolley = require('./trolley/trolley')
const router = express.Router()
const {
    formatData
} = require('./utils/tools')
const login = require('./huihui/login')
const reg = require('./huihui/reg');

const apilogin = require('./huihui/apilogin')
const apireg = require('./huihui/apireg')
router.use(express.urlencoded({
    extended: false
}), express.json())
router.use(session({
    secret: 'coman',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}))
router.use(cors)
// router.use('/user', user)
router.use('/user', user)
router.use('/goods', goods);
router.use('/blog', blog);
router.use('/asd', user);
//注册登入
router.use('/login', login);
router.use('/reg', reg);


// 后台登录注册
router.use('/apilogin', apilogin);
router.use('/apireg', apireg);

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
router.get('/ceshi', (req, res) => {
    console.log("123");
    res.send("asd")
});
// 短信验证码
router.use('/sendSms', Sms);
// 图形验证码
router.use('/vcode', vcode);
router.use('/order', order)
router.use('/trolley', trolley)
module.exports = router