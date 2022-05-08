import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/LoginView";
import NoteList from "@/views/NoteList";
import NoteDetail from "@/views/NoteDetail";
import TrashCenter from "@/views/TrashCenter";

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
    component: NoteList,
  },
  {
    path: "/note/:noteId",
    component: NoteDetail,
  },
  {
    path: "/trash/:noteId",
    component: TrashCenter,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
