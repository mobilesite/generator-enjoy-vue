import * as globalVars from '../../globalVars/index';

/**
 * 写cookie的操作
 * @param {String} name - 设置的name
 * @param {String} value - 设置的值
 * @return {expiresDays} - 多少天后失效，默认30天
 */
export function setItem(name, value, days=30){
    let expiresTime = new Date();
    let pageDomain = globalVars.default.pageBaseURL.replace(/^https?:\/\//, '');

    expiresTime.setTime(expiresTime.getTime() + days*24*60*60*1000);
    document.cookie = `${name}=${escape(value)}; expires=${expiresTime.toGMTString()}; domain=${pageDomain}`;
};

/**
 * 获取cookie的操作
 * @param {String} name - 获取的name
 */
export function getItem(name) {  
    let nameWithSuffix = `${name}=`;
    let arr = document.cookie.split(';'); 

    for(let i=0; i < arr.length; i++) {
        let temp = arr[i];

        if(temp.charAt(0) === ' '){
            temp = temp.substr(1);     //判断一下字符串有没有前导空格，有的话，从第二位开始取  
        }
        if(temp.indexOf(nameWithSuffix) === 0){
            return unescape(temp.substr(nameWithSuffix.length));
        }  
    }  
    return false;  
}
     
/**
 * 获取cookie的操作
 * @param {String} name - 清除的name
 */
export function removeItem(name) {  
    set(name, '', -1);
};

export const cookie = {
    setItem,
    getItem,
    removeItem
}