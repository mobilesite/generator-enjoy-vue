import Toast from '@/commonComponents/Toast/main.vue'

const VueToast = {};

//执行回调
let doCallBack = options => {
    if(typeof options === 'object' && options.callback){
        options.callback && options.callback();
    }
}

let removeToast = (event, options) => {
    if (event.target.parentNode.childNodes.length > 1) {
        event.target.parentNode.removeChild(event.target);
    } else {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    };

    doCallBack(options);
};

VueToast.install = function (Vue, options) {
    const ToastController = Vue.extend(Toast);

    ToastController.prototype.close = function () {
        this.show = false;
        this.$el.addEventListener('transitionend', function(event){
            removeToast(event, options);
        });
    };

    Vue.prototype.$toast = (option = {}) => {
        let instance = new ToastController().$mount(document.createElement('div'));
        let timeLength;
        let obj = {};

        const defaultTimeLife = 2000;

        if (document.querySelectorAll('.enjoy-toast').length) {
            doCallBack(options);
            return;
        }

        if(typeof option === 'string'){
            obj.msg = option;
            obj.timeLength = defaultTimeLife;
        } else {
            obj = option;
        }

        if( option.timeLength === undefined && (!options || options.timeLength === undefined) ) {
            obj.timeLength = defaultTimeLife;
        }

        instance.msg = obj.msg;

        if (options && options.container) {
            document.querySelector(options.container).appendChild(instance.$el);
        } else {
            document.body.appendChild(instance.$el);
        }
            
        instance.show = true;

        setTimeout(function () {
            instance.close()
        }, obj.timeLength);

        return instance;
    }
}

export default VueToast;