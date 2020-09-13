const Core = require('@alicloud/pop-core');
const express = require('express');
const router = express.Router()
const {
    Enum
} = require('../utils/Enum')
router.get('/:PhoneNumbers', (req, res) => {
    const {
        PhoneNumbers
    } = req.params
    let randomNum = (parseInt((Math.random() * 9000) + 1000)).toString();
    const TemplateParam = `{"code":${randomNum}}`
    req.session.Sms = randomNum
    var client = new Core({
        accessKeyId: 'LTAI4G2vNjhrGTESjtA9axB6',
        accessKeySecret: 'QFNGnTnhvR5P1GDMZFz9ahFPm6zWwm',
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    });

    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": PhoneNumbers,
        "SignName": "ugoshop",
        "TemplateCode": "SMS_201715882",
        "TemplateParam": TemplateParam
    }

    var requestOption = {
        method: 'POST'
    };
    client.request('SendSms', params, requestOption).then(() => {
        res.send(Enum(1001));
    }, (ex) => {
        console.log(ex);
    })
})

module.exports = router;