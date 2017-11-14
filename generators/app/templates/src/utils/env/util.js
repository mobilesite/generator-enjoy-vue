/**
 * 判断是否是微信
 */
export const ua = navigator.userAgent.toLowerCase();

export const isWechat = (function(){
    if(ua.match(/micromessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
})();

export const env = {
    ua,
    isWechat
};