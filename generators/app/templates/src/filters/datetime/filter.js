/**
 * 格式化时间
 * @param {number} timestamp - 时间戳
 * @param {formatStr} formatStr - 需要处理成的格式，注意大小写，formatStr格式如：YYYY-MM-DD hh:mm:ss 或者 YYYY.MM.DD 等等
 * @author paian<pai_an@qq.com>
 * @since  17/8/2
 */

function addZero(str) {
    let newStr = str + '';

    if (newStr.length === 1) {
        newStr = '0' + newStr;
    }

    return newStr;
}

export default function(timestamp, formatStr) {
    const defaultFormatStr = 'YYYY-MM-DD hh:mm:ss';

    let year;
    let month;
    let date;
    let hour;
    let minute;
    let second;

    if (timestamp == undefined) {
        throw 'formatDate: parameter timestamp error';
    } else if (typeof timestamp === 'string') {
        timestamp += '000';
        timestamp = parseInt(timestamp, 10);
        if (isNaN(timestamp)) {
            throw 'formatDate: parameter timestamp error';
        } else {
            timestamp = new Date(timestamp);
        }
    } else if (typeof timestamp === 'number' && !isNaN(timestamp)) {
        timestamp = new Date(timestamp * 1e3);
    } else {
        throw 'formatDate: timestamp type error';
    }

    year = timestamp.getFullYear();
    month = addZero(timestamp.getMonth() + 1);
    date = addZero(timestamp.getDate());
    hour = addZero(timestamp.getHours());
    minute = addZero(timestamp.getMinutes());
    second = addZero(timestamp.getSeconds());

    if (!formatStr) {
        formatStr = defaultFormatStr;
    }
    formatStr = formatStr.replace(/YYYY/, year);
    formatStr = formatStr.replace(/MM/, month);
    formatStr = formatStr.replace(/DD/, date);
    formatStr = formatStr.replace(/hh/, hour);
    formatStr = formatStr.replace(/mm/, minute);
    formatStr = formatStr.replace(/ss/, second);

    return formatStr;
}
