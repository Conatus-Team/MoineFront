import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home"),
    },
    {
      path: "/room",
      name: "RoomList",
      component: () => import("@/views/RoomList"),
    },
    {
      path: "/room/:roomUUID", // 동적 import
      name: "Chatting",
      props: true,
      component: () => import("@/views/Chatting"),
    },
    {
      path: "/chatdata",
      name: "ChatData",
      props: true,
      component: () => import("@/views/ChatData"),
    },
    {
      path: "/data-table",
      name: "DataTable",
      props: true,
      component: () => import("@/views/DataTableTest"),
    },
    {
      path: "log/room/:roomUUID", // 동적 import
      name: "RoomDetail",
      props: true,
      component: () => import("@/views/RoomDetail"),
    },
  ],
});
