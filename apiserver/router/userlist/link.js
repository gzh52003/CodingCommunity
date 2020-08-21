const express = require('express');

const router = express.Router();

const mongo = require('../utils/mongo')

const {formatData} = require('../utils/tools')

router.get('/', async(req,res) =>{
  //查找community中userlist的数据库
  const result = await mongo.find('userlist')

  res.send(formatData({data:result}))
})

// 获取单个用户信息、
router.get('/:id',async(req,res)=>{
  const {id} = req.params;
  console.log('id=',id)

  const result = await mongo.find('user',{_id:id})
  console.log(result)
  res.send(formatData({data:result[0]}));
})

module.exports = router;