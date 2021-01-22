// 通过时间戳拿到年份
const getYearByTimeStamp = (ts) =>{
    const date = new Date(ts);

    return date.getFullYear();
};

module.exports = getYearByTimeStamp;

console.log('123');