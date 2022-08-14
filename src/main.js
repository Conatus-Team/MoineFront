import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import axios from "axios";

import router from "./router";
import { BASE_URL } from "./constants/baseUrl";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Vue.use(axios);
Vue.prototype.$axios = axios;
Vue.prototype.$BASE_URL = BASE_URL;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;




new Vue({
  router,
  components: { App },
  template: "<App/>",
  render: (h) => h(App),
}).$mount("#app");
// new Vue({
//   el: "#app",
//   router,
//   components: { App },
//   template: "<App/>",
// });
