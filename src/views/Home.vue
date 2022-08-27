<template>
  <div>
    <HeaderBar title="Home" />
    <!-- 메인 문구에 Home 표시를 해주자 -->
    <div class="mybox">
     <p>그룹id  : <input v-model="groupId" placeholder="그룹id"></p>
     <p>취미    : <input v-model="category" placeholder="취미"></p>
     <p>그룹이름: <input v-model="groupName" placeholder="그룹이름"></p>
     <button class="btn btn-primary" @click="createRoom">채팅방 만들기(가입자동)</button>
    </div>
    
    <div><p></p></div>

    <div class="mybox">
     <p>그룹id  : <input v-model="groupId" placeholder="그룹id"></p>
      <button class="btn btn-primary" @click="joinRoom">채팅방 가입하기</button>
    </div>

    <div><p></p></div>
    <div class="mybox">
    <router-link to="/room/">
      <button class="btn btn-primary">채팅방 목록 보기</button>
    </router-link>
    </div>
    <div><p></p></div>
    <div>
      <router-link tag="a" to="https://www.naver.com">이동</router-link>
      
    </div>

<div><p></p></div>
    <div class="mybox">
     <p>유저id: <input v-model="userId" placeholder="유저id"> </p>

     <p>유저 닉네임: <input v-model="userNickname" placeholder="유저 닉네임"></p>

    <p> 세션 스토리지 id, nickname = {{sessionUserId}}, {{sessionUserNickname}}</p>
     <button class="btn btn-primary" @click="setUser">유저 정보 등록</button>
    </div>
  </div>
</template>
<script>
import HeaderBar from "@/components/HeaderBar";

export default {
  name: "HomeView",
  data() {
  return {
    userId: 0,
    userNickname: "nickname",
    groupId:0,
    category:"취미",
    groupName: "그룹이름",
    sessionUserId: 0,
    sessionUserNickname: "nickname"
    }
  },
  mounted(){
    this.getSessionUser()
  },
  components: {
    HeaderBar,
  },
  methods: {
    createRoom() {
      this.$axios
        .post(`${this.$BASE_URL.chatting}/chat/room/test?category=${this.category}&groupId=${this.groupId}&groupName=${this.groupName}&userId=${this.sessionUserId}`, {

        })
        .then((response) => {
          alert("채팅방 개설 성공")
          console.log(response)
          // this.$router.push({
          //   name: "Chatting",
          //   params: { sender: "나", roomUUID: response.data.roomUUID },
          // });
        })
        .catch((response) => {
          console.log(response);
          alert("채팅방 개설에 실패하였습니다.");
        });
    },
    getSessionUser(){
      this.sessionUserId = sessionStorage.getItem("userId");
      this.sessionUserNickname = sessionStorage.getItem("userNickname");
    }
    ,
    setUser(){
      sessionStorage.setItem("userId", this.userId);
      sessionStorage.setItem("userNickname", this.userNickname);
      this.getSessionUser()
      
    },
    joinRoom(){
      this.$axios.post(
          // `http://localhost:8080/chat/data/get/pagesort?page=${this.page}&size=${this.size}`
          `${this.$BASE_URL.chatting}/chat/join?groupId=${this.groupId}&userId=${this.sessionUserId}`
        )
        .then((response) => {
          console.log("axios response");
          console.log(response);
          alert("채팅방 가입 성공")
        })
        .catch((response) => {
          console.log(response);
          alert("채팅방 가입에 실패하였습니다.");
        });
    }
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css";
.mybox{
  /* border-style: dashed; */
  border-radius: 10px;
  background-color: rgb(228, 242, 255);
  padding: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  
}
</style>
