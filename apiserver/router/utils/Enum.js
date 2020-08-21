/*
 * @Author: coman
 * @LastEditors: Please set LastEditors
 * @Date: 2020-08-08 16:33:10
 * @motto: No pain,No gain
 * @LastEditTime: 2020-08-12 21:39:19
 */
// 枚举错误类型
function Enum(code, data, msg) {
    code = code || 1001;
    data = data || [];
    msg = msg || "success";

    msg = code === 1002 ? "fail" : "success";
    msg = code === 1003 ? "fail" : "success";
    msg = code === 1004 ? "token过期" : "success";

    return {
        code,
        data,
        msg
    }
}
module.exports = {
    Enum
}