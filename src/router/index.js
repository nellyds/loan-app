import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import ApplicationSubmit from "../views/ApplicationSubmit.vue";
import Disqualified from "../views/Disqualified.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing
  },
  {
    path: "/apply",
    component: ApplicationSubmit
  },
  {
    path:"/disqualified",
    component: Disqualified
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
