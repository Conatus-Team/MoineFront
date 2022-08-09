<template>
  <div>
    <b-navbar type="faded" variant="light" id="navbar">
      <b-navbar-brand @click="goHome" id="home">Home</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item disabled>{{ title }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css";

#home {
  cursor: pointer;
}
#navbar {
  margin-bottom: 1rem;
}
</style>
