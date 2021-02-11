import Vuex from 'vuex'
import axios from 'axios'

const appStore = () => {
  return new Vuex.Store({
    state: {
      message: 'Hello Vuex',
      users: [],
      user: {},
      count: 0,
    },
    mutations: {
      increment(state) {
        state.count++
      },
      setUsers(state, users) {
        state.users = users
      },
      setUser(state, user) {
        state.user = user
      },
    },
    actions: {
      incrementOne(context) {
        context.commit('increment')
      },
      getUsers({ commit }) {
        return axios
          .get('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            commit('setUsers', response.data)
          })
      },
      getUser({ commit }, id) {
        return axios
          .get('https://jsonplaceholder.typicode.com/users/' + id)
          .then((response) => {
            commit('setUsers', response.data)
          })
      },
    },
    modules: {},
  })
}

export default appStore
