import { createStore } from 'vuex';

export default createStore({
  state: {
    test: { a: 10 },
  },
  mutations: {
    setTestA(state, value) {
      state.test.a = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
