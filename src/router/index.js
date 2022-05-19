import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/LoginView";
import NoteListView from "@/views/NoteListView";
import NoteDetailView from "@/views/NoteDetailView";
import TrashCenterView from "@/views/TrashCenterView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/notebook",
    component: NoteListView,
  },
  {
    path: "/note",
    component: NoteDetailView,
  },
  {
    path: "/trash",
    component: TrashCenterView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
