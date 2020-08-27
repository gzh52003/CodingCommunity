<<<<<<< HEAD
function Enum(code=1, data=[], msg="successs") {
    msg = code === 0 ? "fail" : "successs"
=======
function Enum({
    code = 1,
    data = [],
    msg = "success"
} = {}) {
    if (code === 0) {
        msg = "fail"
    }
>>>>>>> 3c23c9ddd0663a0e270f569d47f63f7bf897ef19
    return {
        code,
        data,
        msg
    }
}

module.exports = {
    Enum
}