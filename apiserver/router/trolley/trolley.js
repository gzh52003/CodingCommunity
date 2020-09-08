const {
    // insert,
    // updateById,
    // remove,
    find,
    remove,
    updateById,
    insert
} = require("../utils/mongo");
const {
    Enum
} = require('../utils/Enum');
const express = require('express');

const router = express.Router();

/* 
    goodsInfo([{'goodsId':xxx,"goodsTotal":xx}]) 每次都传商品的全部信息
*/
router.post('/', async (req, res) => {
    const {
        userId,
        goodsInfo
    } = req.body;
    let userTrolley = await find("trolley", {
        userId
    })
   console.log('user',userId);
   console.log('goodsInfo',goodsInfo);
   
    // 如果存在购物车，则直接更新
    if (userTrolley.length===0) {
        await insert('trolley',{
            userId,
            trolleyitems:goodsInfo
        })
    }else{
          const cart_id = userTrolley[0]._id  
          console.log('cart',cart_id);
        try{ 
            await updateById('trolley',{
            trolleyitems:goodsInfo
        },cart_id)
        res.send(Enum(1001))
    }catch(err){
        res.send(Enum(1002))
    }
    }
})


module.exports = router