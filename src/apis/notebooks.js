import request from "@/helper/request";

const URL = {
  GET: "/notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:id",
  DELETE: "/notebooks/:id",
};

export default {
  getALL() {
    return request(URL.GET);
  },
  updateNotebook(notebooksId, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":id", notebooksId), "PATCH", { title });
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(":id", notebookId), "DELETE");
  },
  addNotebook({ title = "" } = { title: "" }) {
    return request(URL.ADD, "POST", { title });
  },
};
