/**
 * @author paian<pai_an@qq.com>
 * @since  17/1/14
 */

/**
 * 删除数组中的某一个值为Number | String | Boolean | Null | Undefined类型的项
 * @param {Array} arr - 待操作的数组()
 * @param {Number | String | Boolean | Null | Undefined} item - 待删除的项的值
 * @return {Boolean} 是否删除成功
 */
export function removeItem(arr, item) {
    if (!arr.length) {
        return false;
    }
    const index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
        return true;
    }
    return false;
}

export const arrayExt = {
    removeItem
}
