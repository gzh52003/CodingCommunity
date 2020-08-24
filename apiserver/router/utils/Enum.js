function Enum(code, data, msg) {
    code = code || 1001;
    data = data || [];
    msg = msg || "success";
    switch (code) {
        case 1002:
            msg = "fail";
            break;
        case 1003:
            msg = "用户名错误";
            break;
        case 1004:
            msg = "token过期";
            break;
    }
    return {
        code,
        data,
        msg
    }
}
module.exports = {
    Enum
}