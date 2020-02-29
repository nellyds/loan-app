import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isQualified: false,
    submissionComplete: false,
    canyoneros: [
      {
          model: 'F-Series',
          cost: 20000.00
        },
          {
          model: 'H-Series',
          cost: 18000.00
      }
      ],
    geos: [
      {
          model: 'The Ned',
          cost: 200000
          },
          {
          model: 'The Maude',
          cost: 20.00000
      }
      ],
    hondas: [          
      {
          model: 'The Chaulmers',
          cost: 20000.00
      }
      ]
  },
  mutations: {
      applicationReported(state, argument) {
        if (argument.result === false){
          this.state.isQualified = false
        } else this.state.isQualified = true
        this.state.submissionComplete = true
    }
  },
  actions: {},
  modules: {}
})
