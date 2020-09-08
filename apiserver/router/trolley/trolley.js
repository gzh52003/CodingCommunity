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
// 获取购物车信息
router.get('/:id',async(req,res)=>{
    const {
        id
    }=req.params
    // 查找用户购物车
   let cart =  await find('trolley',{
        userId:id
    })
    if(cart.length===0){
        res.send(Enum(1005));
    }else{
         cart = cart[0];
        console.log('goodsInfo',cart);
        let trolleyitems =JSON.parse (cart.trolleyitems);
        cart.queryList = trolleyitems.map(item => {
            return item.goodsId
        })
            await find('goods',{
                _id: cart.queryList
            }).then(item=>{
              item = item.map(it=>{
                trolleyitems.forEach(trItem =>{
                    if(trItem.goodsId == it._id){
                        it.total = trItem.goodsTotal
                    }
                })
                return it
              })
              console.log(item);
                cart.trolleyitems =item;
                res.send(Enum(1001,cart))
            })
    
        //res.send(Enum(1001,cart));
    }
    // cart = cart[0];
   
})

module.exports = router