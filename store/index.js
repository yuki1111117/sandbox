import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/database'

const appStore = () => {
  return new Vuex.Store({
    state: {
      // tutorial
      users: [],
      // tutorial END
      count: 0,
      // default.vue
      isLogin: false,
      userData: null,
      // default.vue END
      // search
      search: {},
      // search END
    },
    mutations: {
      // cookie
      increment(state) {
        state.count++
      },
      setCookie(state, value) {
        state.count = value
      },
      // cookie END
      // tutorial
      setUsers(state, users) {
        state.users = users
      },
      // tutorial END
      // default.vue
      isLoginChange(state, bool) {
        state.isLogin = bool
      },
      setUserData(state, value) {
        state.userData = value
      },
      // defualt.vue END
    },
    actions: {
      // cookie
      incrementOne(context) {
        context.commit('increment')
      },
      incrementAndBackup(context) {
        context.commit('increment')
        firebase
          .database()
          .ref('publicR')
          .child(context.state.userData.uid)
          .child('cookie')
          .set({ count: context.state.count })
      },
      // cookie END
      // default.vue
      getUserData(context) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            context.commit('isLoginChange', true)
            context.commit('setUserData', user)
            firebase
              .database()
              .ref('publicR')
              .child(context.state.userData.uid)
              .child('cookie')
              .child('count')
              .on('value', (snapshot) =>
                context.commit('setCookie', snapshot.val())
              )
          } else {
            context.commit('isLoginChange', false)
            context.commit('setUserData', null)
          }
        })
      },
      // default.vue END
      getIsLogin(context) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            context.commit('isLoginChange', true)
          } else {
            context.commit('isLoginChange', false)
          }
        })
      },
      // tutorial
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
      // tutorial END
    },
  })
}

export default appStore
