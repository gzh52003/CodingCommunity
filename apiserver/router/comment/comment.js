const {
    // insert,
    // updateById,
    // remove,
    find,
    remove
} = require("../utils/mongo");

const {
    Enum
} = require('../utils/Enum');

const express = require('express');

const router = express.Router();

// 获取全部评论
router.get('/', async (req, res) => {
    let {
        pageSize,
        pageNo,
    } = req.query;
    const skip = (pageNo - 1) * pageSize;
    try {
        let result = await find("comment", {}, {
            pagesize: pageSize * 1,
            skip: skip
        });
        res.send(Enum(1001, result));
    } catch (e) {
        res.send(Enum(1002));
    }
})

// 删除评论
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    let arr = id.split(",");
    if (arr.length === 1) {
        arr = id
    }
    try {
        await remove("comment", arr);
        res.send(Enum(1001))
    } catch (e) {
        res.send(Enum(1002))
    }
})

module.exports = router