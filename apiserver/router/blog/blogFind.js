const express = require('express')
const router = express.Router()
const {
    find
} = require('../utils/mongo')
const {
    Enum
} = require('../utils/Enum')

router.get('/',async (req,res)=>{
    try {
        let {page = 1,size=10,sort="ctime,1"}=req.query;
        let skip = (page-1)*size;
        let limit = size*1;

        const result = await find("blogs",{},{skip,limit,sort});
        console.log(req.query);
        res.send(Enum(1, result));
    } catch (e) {
        res.send(Enum(0, e));
    }

})


module.exports = router

