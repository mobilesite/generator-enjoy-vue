const DEFAULT_INTERVAL_TIME = 1000/60;

export const requestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback){
            return window.setTimeout(callback, DEFAULT_INTERVAL_TIME)
        }
})();

export const cancelAnimationFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (timmerId){
            return window.clearTimeout(timmerId)
        }
})();

export const raf = {
    requestAnimationFrame,
    cancelAnimationFrame
}