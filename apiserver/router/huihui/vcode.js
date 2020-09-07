const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');

const {
   formatData
} = require('../utils/tools');

// 生成验证码
router.get('/', async (req, res) => {
   // 生成图像验证码：svg-captcha
   const options = {
      // size: 10,
      noise: 3,
      ignoreChars: '0o1il',
      background: '#F5F7FA',
      color: true,
      fontSize: 50,
      height: 54
   }
   // 验证码在这里生成
   const captcha = svgCaptcha.create(options); // {data:'<svg/>',text:'abcd'}

console.log('captcha',captcha);

   // 把验证码存入会话Session
   req.session.vcode = captcha.text.toLowerCase();
   console.log('ggg',req.session.vcode);

   console.log('vcode.session=', req.session);


   res.send(formatData({
      data: {
         svg: captcha.data,
         text: captcha.text.toLowerCase()
      }
   }));
})



module.exports = router;