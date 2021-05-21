import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'

const appStore = () => {
  return new Vuex.Store({
    state: {
      // tutorial
      users: [],
      // tutorial END
      // default.vue
      isLogin: false,
      ojUserData: null,
      // default.vue END
    },
    mutations: {
      // default.vue
      isLoginChange(state, bool) {
        state.isLogin = bool
      },
      setUserData(state, value) {
        state.ojUserData = value
      },
      // defualt.vue END
    },
    actions: {
      // default.vue
      getUserData(context) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            context.commit('isLoginChange', true)
            context.commit('setUserData', user)
          } else {
            context.commit('isLoginChange', false)
            context.commit('setUserData', null)
          }
        })
      },
      // default.vue END
      // todo 使われてない
      getIsLogin(context) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            context.commit('isLoginChange', true)
          } else {
            context.commit('isLoginChange', false)
          }
        })
      },
    },
  })
}

export default appStore
