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
      // todo いらないはず・・・消すとisLoginが使えない
      // 何時:getUserData()で使用する。
      isLoginChange(state, bool) {
        state.isLogin = bool
      },
      // setUserData()
      // 何時:getUserData()で使用する。

      setUserData(state, value) {
        state.ojUserData = value
      },
      // defualt.vue END
    },
    actions: {
      // default.vue
      // todo 名前の変更 getじゃない気がする
      // getUserData()
      // 何時:default.vueで使用する。
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
    },
  })
}

export default appStore
