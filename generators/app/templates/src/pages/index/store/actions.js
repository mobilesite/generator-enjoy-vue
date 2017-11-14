import * as types from './mutation-types';

export const updateToken = ({ commit }, token) => {
    commit(types.UPDATE_TOKEN, token);
};
