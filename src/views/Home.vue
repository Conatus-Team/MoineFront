<template>
  <div>
    <HeaderBar title="Home" />
    <!-- 메인 문구에 Home 표시를 해주자 -->

    <button class="btn btn-primary" @click="enterChatBot">채팅하기</button>
    <div><p></p></div>
    <router-link to="/room/">
      <button class="btn btn-primary">채팅방 목록 보기</button>
    </router-link>
    <div><p></p></div>
    <router-link to="/chatdata">
      <button class="btn btn-primary">채팅 내역 보기</button>
    </router-link>
    <div><p></p></div>
    <router-link to="/data-table">
      <button class="btn btn-primary">테이블</button>
    </router-link>
  </div>
</template>
<script>
import HeaderBar from "@/components/HeaderBar";

export default {
  name: "HomeView",
  components: {
    HeaderBar,
  },
  methods: {
    enterChatBot() {
      this.$axios
        .post("http://localhost:8080/chat/bot/room")
        .then((response) => {
          this.$router.push({
            name: "Chatting",
            params: { sender: "나", roomUUID: response.data.roomUUID },
          });
        })
        .catch((response) => {
          console.log(response);
          alert("채팅방 개설에 실패하였습니다.");
        });
    },
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css";
</style>
