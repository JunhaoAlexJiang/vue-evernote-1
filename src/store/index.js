import Vue from "vue";
import Vuex from "vuex";
import notebook from "./modules/notebook";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    notebook,
  },
});
