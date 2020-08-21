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