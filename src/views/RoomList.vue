<template>
  <div>
    <HeaderBar title="채팅방 리스트" />

    <div class="container" id="app" v-cloak>
      <div class="row">
        <div class="col-md-12">
          <h3>채팅방 리스트</h3>
        </div>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text">방제목</label>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="room_name"
          v-on:keyup.enter="createRoom"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="createRoom">
            채팅방 개설
          </button>
        </div>
      </div>
      <ul class="list-group">
        <!-- <router-link to="`/room/${item.roomUUID}`"></router-link> -->
        <li
          class="list-group-item list-group-item-action"
          v-for="item in chatrooms"
          v-bind:key="item.roomUUID"
          v-on:click="enterRoom(item.roomUUID)"
          router-link
          to="/"
        >
          <router-link to="/">{{ item.roomUUID }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// const API_URL = `http://localhost:8080`;
import HeaderBar from "@/components/HeaderBar";

export default {
  name: "RoomList",
  components: {
    HeaderBar,
  },
  props: {
    msg: String,
  },
  data: () => ({
    room_name: "",
    chatrooms: [],
  }),
  created() {
    // 초기화 시 가져오기
    this.findAllRoom();
  },

  watch: {
    // currentBranch가 변경될 때마다 데이터 다시 가져오기
    currentBranch: "fetchData",
  },

  methods: {
    findAllRoom() {
      this.$axios.get("http://localhost:8080/chat/rooms").then((response) => {
        console.log(response.data);
        const room = response.data;

        this.chatrooms = room;
        return room;
      });
    },

    createRoom() {
      if (this.room_name === "") {
        alert("방 제목을 입력해 주십시요.");
      } else {
        const room = { roomUUID: this.room_name };
        this.chatrooms.push(room);
        const params = new URLSearchParams();
        params.append("name", this.room_name);
        this.$axios
          .post("http://localhost:8080/chat/room", params)
          .then((response) => {
            alert(`${response.data.roomName}방 개설에 성공하였습니다.`);
            this.room_name = "";
            this.findAllRoom();
          })
          .catch((response) => {
            console.log(response);
            alert("채팅방 개설에 실패하였습니다.");
          });
      }
    },
    enterRoom(roomUUID) {
      const sender = prompt("대화명을 입력해 주세요.");
      if (sender !== "") {
        localStorage.setItem("wschat.sender", sender);
        localStorage.setItem("wschat.roomUUID", roomUUID);
        // location.href = "/chat/room/enter/" + roomUUID;
        this.$router.push({
          name: "RoomDetail",
          params: { sender, roomUUID },
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css";

</style>
