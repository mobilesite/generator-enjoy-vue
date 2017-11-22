/**
 * 极简单地过滤掉某个特殊字符
 * @param {String} originStr 
 */
export function filterChars(originStr){
    return originStr.replace(/[&<>'"]/g, '');
}