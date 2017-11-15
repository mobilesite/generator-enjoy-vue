import Vue from 'vue';
import Router from 'vue-router';
import globalVars from '@/globalVars/index';
import Help from '@/businessComponents/Help/main.vue';
import NotFound from '@/businessComponents/NotFound/main.vue';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: '',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            // redirect: '/help',
            // component: {
            //   template: '' //控制当访问/help路径时候，router-view中什么也不展示，否则，如果这里不进行设置，会展示成404页面的内容
            // }
            // component: Help
        },
        {
            path: '*',
            component: NotFound,
            meta: {
                title: '页面未找到'
            }
        }
    ]
});

/**
 * 路由发生变化修改页面title
 */
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});

export default router;
