import { BASE_URL } from "@/constants/baseUrl";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/vue-home",
      name: "home",
      component: () => import("@/views/Home"),
    },
    {
      // room/userId
      path: "/room",
      name: "RoomList",
      component: () => import("@/views/RoomList"),
    },
    {
      // room/userId/roomId
      path: "/room/:roomId", // 동적 import
      name: "RoomDetail",
      props: true,
      component: () => import("@/views/RoomDetail"),
    },
    {
      // room/userId/roomId
      path: "/enter/:id", // 동적 import
      query: "groupId",
      name: "enter",
      props: true,
      component: () => import("@/views/Enter"),
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
