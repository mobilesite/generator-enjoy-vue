/**
 * 验证手机号码
 * @param phone
 * @returns {boolean}
 */
export function checkMobile(phone) {
    if(!(/^1\d{10}$/.test(phone))) {
        return false;
    }
    return true;
};

/**
 * 验证码
 * @param code
 * @returns {boolean}
 */
export function checkCode(code) {
    if(!(/^\d{4}$/.test(code))) {
        return false;
    }
    return true;
};

export const verify = {
    checkMobile,
    checkCode
};
