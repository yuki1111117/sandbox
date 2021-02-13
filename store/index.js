import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/database'

const appStore = () => {
  return new Vuex.Store({
    state: {
      message: 'Hello Vuex',
      users: [],
      user: {},
      count: 0,
      isLogin: false,
      userData: null,
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
      isLoginChange(state, bool) {
        state.isLogin = bool
      },
      userDataChange(state, value) {
        state.userData = value
      },
    },
    actions: {
      incrementOne(context) {
        context.commit('increment')
      },
      incrementAndBackup({ commit }, state) {
        commit('increment')
        firebase
          .database()
          .ref('cookie/' + this.user.uid)
          .set({ count: state.count })
      },
      getUserState({ commit }) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('isLoginChange', true)
            commit('userDataChange', user)
          } else {
            commit('isLoginChange', false)
            commit('userDataChange', null)
          }
        })
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
