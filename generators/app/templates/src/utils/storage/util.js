import { isType } from '../isType/util';

const handleError = (err) => {
    if (window && window.console) {
        console.log(err); // eslint-disable-inline
    }
};
const toString = Object.prototype.toString;
const hasLocalStorage = window && window.localStorage;


/**
 * 检测浏览器是否支持本地存储
 * @param testKey {String} - 用于测试的键值，通常情况下可以不传，默认值是testKey123456789012345678901234567890，
 * 除非这个默认值与你程序中所使用的有效键值相冲突
 * @returns {Boolean}
 */
export const isSupported = ((testKey) => {
    /**
     * 除了检测localStorage对象是否存在外，还需要注意手机Safari浏览器开启隐私模式的情况。
     * 手机Safari浏览器中开启隐私模式的具体表现是：
     * 虽然localStorage对象仍然存在
     * 但是setItem会报异常：Error: QuotaExceededError: DOM Exception 22
     * getItem和removeItem直接忽略
     */
    const defaultKey = 'testKey123456789012345678901234567890';
    const localStorage = window && window.localStorage;
    if (!localStorage) {
        return false;
    }

    testKey = testKey || defaultKey;
    try {
        localStorage.setItem(testKey, 'a');
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        handleError(e);
        return false;
    }
})();

const validateKey = (key) => {
    let result = false;
    if (key === undefined) {
        handleError('getItem: parameter key should not be undefined');
    } else if (key === '') {
        handleError('getItem: parameter key can not be an empty string');
    } else if (key === null) {
        handleError('getItem: parameter key can not be null');
    } else if (isType(key, 'function')){
        handleError('getItem: parameter key can not be a function');
    } else if (typeof key === 'boolean'){
        handleError('getItem: parameter key can not be a boolean');
    } else {
        result = true;
    }

    return result;
}

/**
 * 获取某本地存储字段的数据
 * @param key
 * @returns {String|Number}
 */
export function getItem(key) {
    let result = null;

    if (validateKey(key)) {
        let item;
        try {
            item = localStorage.getItem(key);
        } catch (e){
            handleError(e);
            return result;
        }

        try {
            result = JSON.parse(item);
        } catch (e) {
            result = item;
        }
    }

    return result;
};

/**
 * 设置某本地存储字段的数据
 * @param key
 * @param value
 */
export function setItem(key, value) {
    if (validateKey(key)) {
        const type = typeof value;

        if (type === 'object') {
            if (value === null) {
                // null类型 do nothing
            } else if (type === 'function' && typeof document.getElementById === 'object' ?
                    /^\s*\bfunction\b/.test(`${value}`) : toString.call(value).slice(8, -1) === type) {
                // function类型 do nothing
            } else {
                // object类型
                value = JSON.stringify(value);
            }
        }

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            handleError(e);
        }
    }
};

/**
 * 删除某本地存储字段
 * @param key
 * @param value
 */
export function removeItem(key) {
    if (validateKey(key)) {
        try {
            localStorage.removeItem(key);
        } catch (e){
            handleError(e);
        }
    }
};

/**
 * 删除某本地存储字段
 * @param key
 * @param value
 */
export function clear() {
    try {
        localStorage.clear();
    } catch (e){
        handleError(e);
    }
};

/**
 * 获取本地缓存空间大小
 * @returns {Number} - 返回本地存储空间大小，单位KB
 */
export function getSpace() {
    let allStrings = '';
    Object.keys(localStorage).map((item) => {
        allStrings += window.localStorage[item];
    });

    return allStrings ? ((allStrings.length * 16) / (8 * 1024)) + 3 : 0;
}

/**
 * 检测本地存储空间是否已满
 * @returns {boolean}
 */
export function checkSpaceFull() {
    const size = getSpace(); // old size
    try {
        setItem('test-size', '1');
    } catch (e) {
        handleError(e);
    }

    // compare old size with new size, if equal, the space is full
    const isFull = (size === getSpace());
    removeItem('test-size');

    return isFull;
}

/**
 * 清除本地存储空间
 * @param key {String} － 待清除的键值
 */
export function clearSpace(key) {
    if (key !== undefined && key !== null && key !== '') {
        Object.keys(localStorage).map((item) => {
            if (item !== key) {
                removeItem(key);
            }
        });
    } else {
        clear();
    }
}

export const storage = {
    isSupported,
    getItem,
    setItem,
    removeItem,
    clear
}
