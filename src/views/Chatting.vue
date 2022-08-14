<template>
  <div>
    <div>
      <HeaderBar title="채팅하기" />
    </div>
    <div class="container" id="app" v-cloak>
      <div>
        <h2>{{ room.name }}</h2>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text">내용</label>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="message"
          v-on:keypress.enter="sendMessage"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="sendMessage">
            보내기
          </button>
        </div>
      </div>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="message in messages"
          v-bind:key="message.messaage"
        >
          <div v-if="message.sender === '나'" id="align-right">
            {{ message.sender }} - {{ message.message }}
          </div>
          <div v-else>{{ message.sender }} - {{ message.message }}</div>
        </li>
      </ul>
      <div></div>
    </div>
  </div>
</template>

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.2/sockjs.min.js"></script> -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script> -->
<script>
// alert(document.title);
// websocket & stomp initialize
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import HeaderBar from "@/components/HeaderBar";

const HOST = "http://localhost:8081";

// let sock = new SockJS(HOST + "/ws/chat");
// let ws = Stomp.over(sock);
let sock;
let ws;
let reconnect = 0;
// vue.js
export default {
  name: "RoomDetail",
  components: {
    HeaderBar,
  },
  data() {
    return {
      roomUUID: "",
      room: {},
      sender: "나",
      message: "",
      messages: [],
    };
  },
  mounted() {
    console.log(HOST);
    sock = new SockJS(`${HOST}/ws/chat`);
    ws = Stomp.over(sock);
    this.connect(this.roomUUID, this.sender);
  },
  created() {
    this.roomUUID = this.$route.params.roomUUID;

    if (this.$route.params.sender) {
      this.sender = this.$route.params.sender;
    }
    this.findRoom();
  },

  methods: {
    recvMessage(recv) {
      this.messages.unshift({
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      });

      //   this.messages.push({
      //     type: recv.type,
      //     sender: recv.type == "ENTER" ? "[알림]" : recv.sender,
      //     message: recv.message,
      //   });
    },
    connect(roomUUID, sender) {
      // pub/sub event
      ws.connect(
        {},
        (frame) => {
          console.log("소켓연결성공");
          console.log(frame);
          ws.subscribe(`/topic/chat/room/${roomUUID}`, (chatMessage) => {
            const recv = JSON.parse(chatMessage.body);
            this.recvMessage(recv);
          });
          ws.send(
            "/app/chat/message",
            JSON.stringify({
              type: "ENTER",
              roomUUID,
              sender,
            }),
            {}
          );
        },
        (error) => {
          console.log(error);
          // eslint-disable-next-line no-plusplus
          if (reconnect++ <= 5) {
            setTimeout(function () {
              console.log("connection reconnect");
              sock = new SockJS("/ws/chat");
              ws = Stomp.over(sock);
              this.connect();
            }, 10 * 1000);
          }
        }
      );
    },
    findRoom() {
      this.$axios.get(`${HOST}/chat/room/${this.roomUUID}`).then((response) => {
        this.room = response.data;
      });
    },
    sendMessage() {
      if (this.message === "") {
        return;
      }
      console.log(`Send message:${this.message}`);
      ws.send(
        "/app/chat/message",

        JSON.stringify({
          type: "TALK",
          roomUUID: this.roomUUID,
          sender: this.sender,
          message: this.message,
        }),
        {}
      );
      this.message = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css";
li {
  text-align: left;
}

#align-right {
  text-align: right;
}
</style>
