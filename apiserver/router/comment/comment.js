const {
    // insert,
    // updateById,
    // remove,
    find
} = require("../utils/mongo");

const {
    Enum
} = require('../utils/Enum');

const express = require('express');

const router = express.Router();

// 获取全部评论
router.get('/', async (res, req) => {
    try {
        const result = await find("comment");
        req.send(Enum(1001, result));
    } catch (e) {
        req.send(1002);
    }
})

module.exports = router