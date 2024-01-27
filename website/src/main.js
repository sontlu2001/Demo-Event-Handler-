import Vue from "vue";
import App from "./App.vue";

import router from "./router.js";
// Import Bootstrap and Bootstrap Vue
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// import "popper.js/dist/popper";
import "font-awesome/css/font-awesome.min.css";
import { BootstrapVue } from "bootstrap-vue";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
  router,
  BootstrapVue,
}).$mount("#app");
