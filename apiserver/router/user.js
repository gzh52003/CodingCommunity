const express = require('express');

const router = express.Router();


// 获取所有用户
router.get('/',(req,res)=>{
    res.send('get all user')
})