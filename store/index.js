import Vuex from 'vuex'

const appStore = () => {
  return new Vuex.Store({
    state: {
      message: 'Hello Vuex',
    },
    mutations: {},
    actions: {},
    modules: {},
  })
}

export default appStore
