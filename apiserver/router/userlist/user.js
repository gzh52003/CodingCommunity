const express = require('express');

const router = express.Router();

const mongo = require('../utils/mongo')

const { Enum } = require('../utils/Enum');
const { route } = require('../comment/comment');

router.get('/', async (req, res) => {
  //查找community中userlist的数据库
  const {
    pageNo,
    pageSize,
    status
  }=req.query
  console.log(status);
  // console.log(pageNo,pageSize)
  const skip = (pageNo-1)*pageSize
  const result = await mongo.find('userlist',{},{
    skip,
    pagesize:pageSize*1,
    status:status
  })

  res.send(Enum(1001, result));
})

// 获取单个用户信息
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // console.log('id=',id)

  const result = await mongo.find('userlist', { _id: id })
  // console.log(result)
  res.send(Enum(1001, result));
})
//删除用户功能
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await mongo.remove('userlist', id);
    res.send(Enum(1001, result))
  } catch (err) {
    res.send(Enum(1002))
  }
})
//改变用户状态
//1001：更变status(1,0)
router.put('/changeStatus/:id', async (req, res) => {
  const { id } = req.params;
  let result = await mongo.find("userlist", { _id: id });
  let status = result[0].status === 1 ? 0 : 1;
  try {
    const change = await mongo.updateById("userlist", { status: status }, id);
    res.send(Enum(1001))
  } catch (e) {
    res.send(Enum(1002))
  }
})

router.put('/:id',async(req,res)=>{
  const {id} = req.params
  let {company,job_title,description} = req.body
  let newData = {company,job_title,description}
  console.log(id)
  try{
    const changeData = await mongo.updateById('userlist',newData,id)
    res.send(Enum(1001))
    console.log(1)
  }catch(e){
    console.log(2)
    res.send(Enum(1002))
  }
})

module.exports = router;