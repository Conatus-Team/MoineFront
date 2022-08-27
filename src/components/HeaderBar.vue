<template>
  <header id = "header">
   <div className="head_Home" @click="goHome">Home</div>
        <div className="head_lecture" @click="goLecture">Lecture</div>
        <div className="head_group" @click="goGroup">Group</div>
        <div className="head_mypage" @click="goMyPage">Mypage</div>
        <div className="head_chatting" @click="goChatting">Chatting</div>
    <!-- <b-navbar type="faded" variant="light" id="navbar">
      <b-navbar-brand @click="goHome" id="home">Home</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item disabled>{{ title }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar> -->
  </header>
</template>

<script>
// const API_URL = `http://localhost:8080`;

export default {
  name: "HeaderBar",
  props: {
    title: String,
  },

  methods: {
    goHome() {
      this.$router.push({
        name: "home",
      });
    },
    goGroup(){
      this.$router.push({
        name: "group",
      });
    },
    goLecture(){
      this.$router.push({
        name: "lecture",
      });
    },
    goMyPage(){
      this.$router.push({
        name: "mypage",
      });
    },
    goChatting(){
      this.$router.push({
        name: "RoomList",
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"; */
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');

header {
 display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
  background-color: #64c964;
}

header > div {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  width: 50%;
  font-size: 25px;
  cursor: pointer;
  justify-content: center;

}
#home {
  cursor: pointer;
}
#navbar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
  background-color: #64c964;
  font-family: 'Do Hyeon', sans-serif;

}
</style>
