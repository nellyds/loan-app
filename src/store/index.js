import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cars: {
        canyoneros: [
          {
          model: 'F-Series',
          cost: '20.000.00'
          },
          {
            model: 'F-Series',
            cost: '20.000.00'
            },
          {
            model: 'F-Series',
            cost: '20.000.00'
            }
        ],
        geos: [
          {
            model: 'F-Series',
            cost: '20.000.00'
            },
            {
              model: 'F-Series',
              cost: '20.000.00'
              }
        ],
        hondas: [          
          {
          model: 'F-Series',
          cost: '20.000.00'
          }
        ]
      },
    isQualified: false,
    submissionComplete: false,
  mutations: {},
  actions: {},
  modules: {}
}});
