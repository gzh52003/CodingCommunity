/*
 * @Author: coman
 * @LastEditors: coman
 * @Date: 2020-08-04 22:32:46
 * @motto: No pain,No gain
 * @LastEditTime: 2020-08-05 20:35:00
 */
// const allow_origin = ['localhost:8080'];

function cors(req, res, next) {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
        "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS"
    })
    if (req.method == "option") {
        res.setStatus("200"); //跨域请求会发送一个method为option的请求类型
    } else {
        next();
    }

}
module.exports = cors;