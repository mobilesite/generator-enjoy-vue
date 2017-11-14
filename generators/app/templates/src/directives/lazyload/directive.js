/**
 * 懒加载
 * @author paian<pai_an@qq.com>

 * @since  17/1/20
 */
export default {
    bind: (el) => {
        // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
        console.log(el);
    },
    inserted: () => {
        // 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
    },
    update: (newValue, oldValue) => {
        // 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新
    },
    componentUpdated: () => {
        // 被绑定元素所在模板完成一次更新周期时调用。
    },
    unbind: () => {
        // 只调用一次， 指令与元素解绑时调用。
    }
};
