/**
 * 事件监听与移除等处理
 */
let ret = {};

if (typeof window.addEventListener === 'function') {
    ret.bindEvent = function(el, event, fn) {
        el.addEventListener(
            event,
            function(e) {
                if (fn(e) === false) {
                    e.preventDefault();
                    e.cancelBubble = true;
                }
            },
            false
        );
    };

    ret.removeEvent = function(el, event, fn) {
        el.removeEventListener(event, fn, false);
    };
} else if (typeof document.attachEvent === 'function') {
    ret.bindEvent = function(el, event, fn) {
        el.attachEvent('on' + event, function(e) {
            if (fn(e) === false) {
                window.event.cancelBubble = true;
                return false;
            }
        });
    };

    ret.removeEvent = function(el, event, fn) {
        el.detachEvent('on' + event, fn);
    };
} else {
    ret.bindEvent = function(el, event, fn) {
        el['on' + event] = fn;
    };

    ret.removeEvent = function(el, event, fn) {
        el['on' + event] = null;
    };
}

export const evt = ret;
