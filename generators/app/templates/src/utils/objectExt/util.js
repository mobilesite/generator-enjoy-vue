/**
 * @module libs/objExt
 * @author paian<pai_an@qq.com>

 * @since  17/1/14
 */

/**
 * 扩充对象
 * @param {Object} target - 被扩展的对象
 * @param {Object} source - 待扩展的内容
 * @return {Object} 被扩展后的对象
 */
export function extend(target, source) {
    if (!target || !source) {
        return target || {};
    }

    if (target instanceof Object) {
        Object.keys(target).map((item) => {
            target[item] = source[item];
        });
    }
    return target;
}


export const objectExt = {
    extend
}