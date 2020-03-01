import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isQualified: false,
    applicationMessage: "",
    apiUrl: 'http://127.0.0.1:5000/',
    canyoneros: [
      {
        model: "F-Series",
        cost: 65000
      },
      {
        model: "H-Series",
        cost: 17000
      }
    ],
    geos: [
      {
        model: "The Ned",
        cost: 2000
      },
      {
        model: "The Maude",
        cost: 10000
      }
    ],
    hondas: [
      {
        model: "The Chaulmers",
        cost: 1500
      }
    ]
  },
  mutations: {
    applicationReported(state, argument) {
      this.state.applicationMessage = argument.message;
      if (argument.result === false) {
        this.state.isQualified = false;
      } else this.state.isQualified = true;
      this.state.submissionComplete = true;
    },
    errorReported(state, argument){
      this.state.applicationMessage = argument.error;
    }
  },
  actions: {},
  modules: {}
});
