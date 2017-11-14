/**
 * @module libs/getStyle
 * @author paian<pai_an@qq.com>

 * @since  17/1/14
 */

/**
 * 删除数组中的某一个值为Number | String | Boolean | Null | Undefined类型的项
 * @param {Object} el - 待操作的数组()
 * @param {Number | String | Boolean | Null | Undefined} item - 待删除的项的值
 * @return {Boolean} 是否删除成功
 */
export function getStyle(el, prop) {
    const style = (el, prop) => {
        return typeof getComputedStyle !== 'undefined'
            ? getComputedStyle(el, null).getPropertyValue(prop)
            : el.style[prop]
    }
}
