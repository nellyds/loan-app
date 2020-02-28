import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
