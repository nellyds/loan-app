import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import ApplicationSubmit from "../views/ApplicationSubmit.vue";
import NextStep from "../views/NextStep.vue";
import Success from "../views/Success.vue";

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
    path: "/next",
    component: NextStep
  },
  {
    path: "/success",
    component: Success
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;
