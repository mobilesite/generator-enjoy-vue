/**
 *
 * @author paian<pai_an@qq.com>
 * @since  17/5/3
 */

/**
 * 节流函数
 * @param { Function } fn
 * @param { Number } delay
 */
export function throttle(fn, delay) {
    let timer = null;
    let lastRun = 0;

    if (timer) {
        // 如果还存在未开始执行的延时，则直接返回，因为下一步程序应该去执行已经存在的延时，然后才能继续添加下一个延时
        return;
    }

    const elapsedTime = Date.now() - lastRun; // elapsedTime [ɪ'læps]距离上次执行fn函数已经过去了多少时间
    const context = this;
    const args = arguments;

    const runCallback = () => {
        lastRun = Date.now(); // 刷新lastRun
        timer = null;
        fn.apply(context, args);
    };

    if (elapsedTime >= delay) {
        runCallback();
    } else {
        timer = setTimeout(runCallback, delay);
    }
}
