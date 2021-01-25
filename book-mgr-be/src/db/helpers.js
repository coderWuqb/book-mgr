const getMeta = () => {
    // 用于表示该用户何时创建、修改等相关信息
    return {
        createdAt:{
            type: Number,
            default: (new Date()).getTime()
        },
        updatedAt:{
            type: Number,
            default: (new Date()).getTime()
        }
    }
}

module.exports = {
    getMeta
}