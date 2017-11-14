/**
 * @module libs/isType
 * @author paian<pai_an@qq.com>

 * @since  17/1/14
 */

/**
 * 针对给定的变量判断是否是指定的类型
 * @param {Object} obj - 待判断的变量
 * @param {Object|String} type - 待匹配的类型
 * @return {Boolean}
 */
export function isType(obj, type) {
    const toString = Object.prototype.toString;
    const fourBaseTypes = {
        undefined: 'undefined',
        number: 'number',
        boolean: 'boolean',
        string: 'string',
    };
    return (fourBaseTypes[typeof obj] === type) ||
        (type === 'null' && obj === null) ||
        (type === 'function' && typeof document.getElementById === 'object' ?
            /^\s*\bfunction\b/.test(`${obj}`) : toString.call(obj).slice(8, -1) === type) ||
        obj instanceof type;
}
