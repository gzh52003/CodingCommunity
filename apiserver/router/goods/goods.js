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
// 获取全部商品
router.get('/', async (req, res) => {
    let {
        pageSize,
        pageNo,
    } = req.query;

    const skip = (pageNo - 1) * pageSize;
    try {
        let result = await find("goods", {}, {
            pagesize: pageSize * 1,
            skip: skip
        });
        res.send(Enum(1001, result));
    } catch (e) {
        res.send(Enum(1002));
    }
})
// 添加商品
router.post("/add", async (req, res) => {
    let data = req.body;
    try {
        await insert("goods", data)
        res.send(Enum(1001));
    } catch (err) {
        res.send(Enum(1002))
    }
})
// 删除商品
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    let arr = id.split(",");
    if (arr.length === 1) {
        arr = id
    }
    try {
        await remove("goods", arr);
        res.send(Enum(1001))
    } catch (e) {
        res.send(Enum(1002))
    }
})
// 查找某种类别的商品

router.get('/classify/:tag', async (req, res) => {
    const {
        tag
    } = req.params;
    try {
        const result = await find('goods', {
            tag
        });
        res.send(Enum(1001, result))
    } catch (err) {
        res.send(Enum(1002))
    }

})

// 获取单个商品信息
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    // console.log('id=',id)

    const result = await find('goods', {
        _id: id
    })
    // console.log(result)
    res.send(Enum(1001, result));
})

// 更改商品信息
router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params
    let {
        three_subtit,
        price,
        rest,
        tag
    } = req.body
    let newData = {
        three_subtit,
        price,
        rest,
        tag
    }
    console.log(id)
    try {
        await updateById('goods', newData, id)
        res.send(Enum(1001))
    } catch (e) {
        res.send(Enum(1002))
    }
})
module.exports = router