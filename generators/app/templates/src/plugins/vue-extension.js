/**
 * 通过这个插件扩展往Vue上面扩展filters、directives、mixins
 */

import * as globalVars from '../globalVars/index';
import filters from '../filters/main';
import directives from '../directives/main';
import utils from '../utils/main';
import apis from '../apis/main';

const VueExtension = {};

VueExtension.install = function (Vue) {
    for(let i in filters) {
        if (filters.hasOwnProperty(i)) {
            Vue.filter(filters[i]);
        }
    }

    //全局变量
    Vue.$pageBaseURL = Vue.prototype.$pageBaseURL = globalVars.default.pageBaseURL;

    //过滤器、指令、工具方法
    Vue.$filters = Vue.prototype.$filters = filters;
    Vue.$directives = Vue.prototype.$directives = directives;
    Vue.$utils = Vue.prototype.$utils = utils;

    //接口(API)
    Vue.$api = Vue.prototype.$api = apis;
};

export default VueExtension;
