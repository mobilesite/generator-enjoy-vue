import originalJsonp from 'jsonp';

function toQueryString(paramObj) {
    let str = '';

    for(let i in paramObj) {
        if(paramObj[i] !== undefined) {
            str += `&${i}=${encodeURIComponent(paramObj[i])}`;
        } else {
            str += `&${i}=`;
        }
    }

    return str ? str.substr(1) : '';
}

function addParamsToUrl(url, paramObj) {
    let queryString = toQueryString(paramObj);

    if(!~url.indexOf('?')) {
        //不包含?
        url += `?${queryString}`;
    } else {
        //包含?
        url += `&${queryString}`;
        url = ulr.replace(/\?&/, '');
    }

    return url;
}

export default function jsonp(url, data, options) {
    url = addParamsToUrl(url, options);
    
    return newPromise((resolve, reject) => {
        originalJsonp(url, options, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    });
}

