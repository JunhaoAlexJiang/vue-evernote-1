import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/components/LoginView";
import NoteList from "@/components/NoteList";
import NoteDetail from "@/components/NoteDetail";
import TrashCenter from "@/components/TrashCenter";

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
