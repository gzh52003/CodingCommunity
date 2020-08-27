function Enum(code=1, data=[], msg="successs") {
    msg = code === 0 ? "fail" : "successs"
    return {
        code,
        data,
        msg
    }
}

module.exports = {
    Enum
}