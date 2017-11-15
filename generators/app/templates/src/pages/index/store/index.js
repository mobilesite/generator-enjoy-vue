import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as actions from './actions';
import * as getters from './getters';
import * as types from './mutation-types'
import * as cookie from '../../../utils/cookie/util';
import * as globalVars from '../../../globalVars/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const mutations = {
    [types.UPDATE_TITLE](state, title) {
        state.title = title;
    },

    [types.UPDATE_TOKEN](state, token) {
        state.token = token;
    },

    [types.UPDATE_COUNT](state, count) {
        state.count = count;
    }, //演示用
};

// 保存应用启动时的初始状态
const token = cookie.getItem(globalVars.default.tokenName)
const state = {
    title: '',
    loading: false,
    token: token ? token : '',
    count: 0
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});

// if (module.hot) {
//     module.hot.accept(
//         [
//             "./actions",
//             "./getters",
//         ],
//         () => {
//             store.hotUpdate({
//                 actions: require("./actions"),
//                 getters: require("./getters"),
//                 modules: {

//                 },
//                 mutations: require("./mutations")
//             });
//         }
//     );
// }
