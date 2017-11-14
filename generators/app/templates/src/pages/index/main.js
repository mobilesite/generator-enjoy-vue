// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueExtension from '../../plugins/vue-extension';
import VueToast from '../../plugins/vue-toast';

// import $ from '../../base/jquery/jquery.min.js';
// import * as aaa from '../../base/jquery.cookie.js';
/* eslint-disable no-debug */
// console.log($('html'));
// console.log(jQuery('html'));
// console.log($.cookie);
/* eslint-enable no-debug */

import Page from './Page';
import router from './router/index';
import store from './store/index';
import globalVars from '../../globalVars/index';
import infiniteScroll from 'vue-infinite-scroll';
import VueLazyload from 'vue-lazyload'

//统一对请求进行处理
axios.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	if (store.getters.getToken) {
        config.headers[globalVars.tokenName]= `${store.getters.getToken}`;
    }
    return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
	return response.data;
}, function(error) {
	return Promise.reject(error);
});

Vue.use(infiniteScroll);
Vue.use(VueLazyload);

Vue.config.productionTip = false;
Vue.use(VueExtension);
Vue.use(VueToast);
Vue.use(VueAxios, axios);

window.globalVars = globalVars;

fastclick.attach(document.body);

function hasClass(el, className){
	var reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
	return reg.test(el.className);
}

function addClass(el, className) {
	if( hasClass(el, className) ) {
		return;
	}
	if (el.className) {
		el.className += ' ' + className;
	} else {
		el.className += className;
	}
}

window.onload = function(){
	var themeClass = window.globalVars.themeClass;
	var $pageWrapper = document.getElementById('page-wrapper');

	addClass($pageWrapper, themeClass);

	/* eslint-disable no-new */
	new Vue({
		el: '#page',
		router,
		store,
		render: h => h(Page)
	});
}