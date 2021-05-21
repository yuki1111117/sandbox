import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'

const appStore = () => {
  return new Vuex.Store({
    state: {
      isLogin: null,
      // 何時:SearchCard.vue,SearchKeyAdd.vue,UserSetting.vue
      ojUserData: null,
    },
    mutations: {
      // setIsLogin()
      // 何時:setUserData()で使用する。
      setIsLogin(state, bool) {
        state.isLogin = bool
      },
      // setUserData()
      // 何時:setUserData()で使用する。

      setUserData(state, value) {
        state.ojUserData = value
      },
    },
    actions: {
      // setUserData()
      // 何時:default.vueで使用する。
      setUserData(context) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            context.commit('setIsLogin', true)
            context.commit('setUserData', user)
          } else {
            context.commit('setIsLogin', false)
            context.commit('setUserData', null)
          }
        })
      },
    },
  })
}

export default appStore
