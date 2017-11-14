/**
 * 检测对webp的支持情况
 * @author paian<pai_an@qq.com>

 * @since  17/5/3
 */
export function isSupportWebp() {
    if (!window) return false;

    let support = false;

    try {
        const doc = document;
        const el = doc.createElement('object');

        el.type = 'image/webp';
        el.innerHTML = '!';
        doc.body.appendChild(el);
        // 如果浏览器支持webp，那么这个object是不可见的(offsetWidth为0),
        // 否则就会显示出来，有可视宽度。
        support = !el.offsetWidth;
        doc.body.removeChild(el);
    } catch (err) {
        // do nothing，保持默认值false
    }

    return support;
}
