import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    id: undefined,
    permission: undefined,
  },
  mutations: {
    savePrivaoeInfo(state, privateInfo) {
      state.id = privateInfo.id;
      state.permission = privateInfo.permission;
    },
  },
});

export default store;
