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
      nickName: 'はむちん',
    },
    mutations: {
      increment(state) {
        state.count++
      },
      setCookie(state, value) {
        state.count = value
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
      setUserData(state, value) {
        state.userData = value
      },
    },
    actions: {
      incrementOne(context) {
        context.commit('increment')
      },
      incrementAndBackup(context) {
        context.commit('increment')
        firebase
          .database()
          .ref('cookie/' + context.state.userData.uid)
          .set({ count: context.state.count })
      },
      getUserData(context) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            context.commit('isLoginChange', true)
            context.commit('setUserData', user)
            firebase
              .database()
              .ref('cookie/' + context.state.userData.uid + '/count')
              .on('value', (snapshot) =>
                context.commit('setCookie', snapshot.val())
              )
          } else {
            context.commit('isLoginChange', false)
            context.commit('setUserData', null)
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
  })
}

export default appStore
