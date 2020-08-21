const {
    insert,
    updateById,
    remove,
    find
} = require("../utils/mongo");

const {
    Enum
} = require('../utils/Enum');

const express = require('express');

const router = express.Router();

router.get('/', async (res, req) => {

    try {
        await find("comment");
        req.send(Enum(1001));
    } catch (e) {
        req.send(1002);
    }
})

module.exports = router