import { BASE_URL } from "@/constants/baseUrl";
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
      path: ":roomId", // 동적 import
      name: "RoomDetail",
      props: true,
      component: () => import("@/views/RoomDetail"),
    },
    {
      path: "/group",
      name: "group",
      // component: `${BASE_URL.group}/group`,
      beforeEnter() {window.location.href =`${BASE_URL.group}/group`}
    },
    {
      path: "/lecture",
      name: "lecture",
      // component: `${BASE_URL.lecture}/lecture`,
      beforeEnter() {window.location.href =`${BASE_URL.lecture}/lecture`}
    },
    {
      path: "/mypage",
      name: "mypage",
      beforeEnter() {window.location.href =`${BASE_URL.mypage}/mypage`}
    },
  ],
});
