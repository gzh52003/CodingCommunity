var COS = require('cos-nodejs-sdk-v5');
const key = "upload/user/" + user.getId() + "/" + fileType + "/" + fileName;
const {
    request
} = require('express');
var cos = new COS({
    SecretId: 'COS_SECRETID',
    SecretKey: 'COS_SECRETKEY',
});

cos.putObject({
    Bucket: 'ugoshop-1301847319',
    Region: 'ap-nanjing',
    Key: 'img', //文件名
    StorageClass: 'STANDARD',
    Body: selectedFile, // 上传文件对象
    onProgress: function (progressData) {
        console.log(JSON.stringify(progressData));
    }
}, function (err, data) {
    console.log(err || data);
    console.log(data.Location);
});