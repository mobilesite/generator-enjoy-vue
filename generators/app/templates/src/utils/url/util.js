/**
 * 把合法的url的参数转成一个数组，如果未传入url则使用当前页面的地址
 * @param url
 */

export function getQueryObj(url) {
    // debugger;
    let urlStr = url || window.location.href;
    let result = {};
    let index = urlStr.indexOf('?');

    if (index > -1) {
        let temp = urlStr.substr(index + 1);
        let indexHash = temp.indexOf('#');
        let arr = [];

        if (indexHash > -1) {
            arr = temp.substr(0, indexHash).split('&');
        } else {
            arr = temp.split('&');
        }

        for (let i = 0, len = arr.length; i < len; i++) {
            let params = arr[i].split('=');
            result[params[0]] = params[1];
        }
    }
    return result;
}

/**
 * 获取一个地址的hash值，如果未传入url则使用当前页面的地址
 * @param url
 */
export function getHash(url) {
    let urlStr = url || window.location.href;
    let index = urlStr.indexOf('#');
    let result = '';

    if(index > -1){
        result = urlStr.substr(index);
    }

    return result;
}

export function replaceParam(url, paramName, paramValue) {
    // debugger;
    let queryObj;
    let index;
    let hash;
    let newQuery = '';

    url = url || window.location.href;
    queryObj = getQueryObj(url);
    queryObj[paramName] = paramValue;//赋值或覆盖

    hash = getHash(url);
    index = url.indexOf('?');
    if( index > -1 || index === -1 && queryObj) {
        let arr = [];

        for(let i in queryObj){
            // arr.push(i + '=' + encodeURIComponent(queryObj[i]));
            arr.push(i + '=' + queryObj[i]);
        }

        if(arr.length) {
            newQuery = '?' + arr.join('&');
        }
    }

    if (index > -1) {
        url = url.substr(0, index) + newQuery + hash;
    } else {
        let indexHash = url.indexOf('#');
        if (indexHash > -1) {
            url = url.substr(0, indexHash) + newQuery + hash;
        } else {
            url += newQuery + hash;
        }
    }

    return url;
}

export const url = {
    getHash,
    getQueryObj,
    replaceParam
}