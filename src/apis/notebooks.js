import request from "@/helper/request";
import { friendlyDate } from "@/helper/time";

const URL = {
  GET: "/notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:id",
  DELETE: "/notebooks/:id",
};

export default {
  getALL() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then((res) => {
          res.data = res.data.sort((notebook1, notebook2) =>
            notebook1.createAt < notebook2.createAt ? 1 : -1
          );
          res.data.forEach((notebook) => {
            notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt);
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateNotebook(notebooksId, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":id", notebooksId), "PATCH", { title });
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(":id", notebookId), "DELETE");
  },
  addNotebook({ title = "" } = { title: "" }) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, "POST", { title })
        .then((res) => {
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt);
          res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
