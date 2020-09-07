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
    1.
*/

// 上传订单
/* 
 params:
 1.goodsList    商品数组，里面放置商品id，以及对应的数量
 2.userId   用户id,
 3.createTime 下单时间
 4.total
 5.
*/
// 提交订单
router.post('/', async (req, res) => {
    const {
        goodsList,
        userId,
        total,
    } = req.body;
    const status = 0;
    // 获取下单时间戳
    const createTime = Date.now();
    try {
        await insert('order', {
            goodsList,
            userId,
            status,
            total,
            createTime
        });
        res.send(Enum(1001))
    } catch (err) {
        res.send(Enum(1002))
    }
})
// 删除订单
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    let arr = id.split(",");
    if (arr.length === 1) {
        arr = id
    }
    try {
        await remove("order", arr);
        res.send(Enum(1001))
    } catch (e) {
        res.send(Enum(1002))
    }
})



// 更改订单状态
router.put('/changeStatus/:id', async (req, res) => {
    const {
        id
    } = req.params;
    let result = await find("order", {
        _id: id
    });
    let status = result[0].status === 1 ? 0 : 1;
    try {
        await updateById("order", {
            status: status
        }, id);
        res.send(Enum(1001))
    } catch (e) {
        res.send(Enum(1002))
    }
})

// 获取全部订单
router.get('/', async (req, res) => {
    let {
        pageSize,
        pageNo,
    } = req.query;
    const skip = (pageNo - 1) * pageSize;
    try {
        let result = await find("order", {}, {
            pagesize: pageSize * 1,
            skip: skip
        });

        // result = result.map(async (item) => {
        //     const user = await find('userlist', {
        //         _id: item.userId
        //     });
        //     item.userId = 
        //     // 获取用户名
        //     item.userId = user[0].userName;
        //     item.goodsList = item.goodsList.split(',');
        //     item.goodsList = item.goodsList.map(async (goodsId) => {
        //         let goods = await find('goods', {
        //             _id: goodsId
        //         });
        //         console.log('goodName', goods);
        //         return goods[0]
        //     })
        //     console.log('item', item);
        //     return item
        // })
        res.send(Enum(1001, result));
    } catch (e) {
        res.send(Enum(1002));
    }
})
module.exports = router