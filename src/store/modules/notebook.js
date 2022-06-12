import Notebooks from "@/apis/notebooks";
import { Message } from "element-ui";

const notebook = {
  namespaced: true,
  state: {
    notebooks: [],
  },
  getters: {
    notebooks: (state) => state.notebooks,
  },
  mutations: {
    setNotebook(state, payload) {
      state.notebooks = payload.notebooks;
    },
    addNotebook(state, payload) {
      state.notebooks.unshift(payload.notebook);
    },
    updateNotebook(state, payload) {
      let notebook =
        state.notebooks.find((notebook) => notebook.id == payload.notebookId) ||
        {};
      notebook.title = payload.title;
    },
    deleteNotebook(state, payload) {
      state.notebooks = state.notebooks.filter(
        (notebook) => notebook.id !== payload.notebookId
      );
    },
  },
  actions: {
    getNotebooks({ commit }) {
      Notebooks.getALL().then((res) => {
        commit("setNotebook", { notebooks: res.data });
      });
    },
    addNotebook({ commit }, payload) {
      Notebooks.addNotebook({ title: payload.title }).then((res) => {
        commit("addNotebook", { notebook: res.data });
        Message.success(res.msg);
      });
    },
    updateNotebook({ commit }, payload) {
      Notebooks.updateNotebook(payload.notebookId, {
        title: payload.title,
      }).then((res) => {
        commit("updateNotebook", {
          notebookId: payload.notebookId,
          title: payload.title,
        });
        Message.success(res.msg);
      });
    },
    deleteNotebook({ commit }, payload) {
      Notebooks.deleteNotebook(payload.notebookId)
        .then((res) => {
          commit("deleteNotebook", {
            notebookId: payload.notebookId,
          });
          Message.success(res.msg);
        })
        .catch((res) => {
          Message.error(res.msg);
        });
    },
  },
};

export default notebook;
