const express = require('express');
const router = express.Router();
// const crypto = require('crypto');

const {
    formatData,
    md5
} = require('../utils/tools');
const mongo = require('../utils/mongo');

// RESTful api规范
// 注册
router.post('/', async (req, res) => {
    let {
        username,
        password,
        yzm
    } = req.body;
    console.log('username=', username)
    console.log('password=', password)
    console.log('yzm=', yzm)
    console.log('req.session.Sms',req.session.Sms)
    if (yzm !== req.session.Sms) {
      res.send(formatData({
          code: 10
      }))
      return;
  }
    // const hash = crypto.createHash('md5');
    // hash.update(password+'laoxie'); // 加盐 盐值
    // password = hash.digest('hex');
    // console.log('password2=',password,password.length)

    password = md5(password)
    let result
    try {
        result = await mongo.insert('userlist', {
            username,
            password
        });
        res.send(formatData({
            data: result
        }));
    } catch (err) {
        res.send(forMatData({
            code: 0
        }))

    }
})
// 查询数据是否被占用
router.get('/check', async (req, res) => {
    const {
        userName
    } = req.query;
    console.log(444444)
    const result = await mongo.find('userlist', {
        username: userName
    });
    if (result.length > 0) {
        res.send(formatData({
            code: 0
        }))
    } else {
        res.send(formatData())
    }
})


module.exports = router;