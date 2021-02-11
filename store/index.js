import Vuex from 'vuex'

const appStore = () => {
  return new Vuex.Store({
    state: {
      message: 'Hello Vuex',
      users: [
        { id: 1, name: 'John', email: 'john@example.com', age: 22 },
        { id: 2, name: 'Merry', email: 'merry@facebook.com', age: 33 },
        { id: 3, name: 'Ken', email: 'ken@amazon.com', age: 29 },
      ],
      count: 0,
    },
    mutations: {
      increment(state) {
        state.count++
      },
    },
    actions: {},
    modules: {},
  })
}

export default appStore
