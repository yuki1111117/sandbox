<template>
  <v-app dark>
    <marquee>ログインのテストだからよ・・・ログインしてくれよな</marquee>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <hamu-logo />
        </div>
        <Home v-if="!isLogin"></Home>
        <MyPage v-if="isLogin" :user="userData"></MyPage>
        <v-switch v-model="$vuetify.theme.dark" primary label="Dark"></v-switch>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase'
import HamuLogo from '~/components/HamuLogo.vue'
import Home from '~/components/Home.vue'
import MyPage from '~/components/MyPage.vue'
export default {
  components: {
    HamuLogo,
    Home,
    MyPage,
  },
  asyncData() {
    // コンポーネントをロードする前に毎回呼び出されます
    return { isLogin: false, userData: null }
  },
  fetch() {
    // `fetch` メソッドはページの描画前にストアを満たすために使用されます
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogin = true
        this.userData = user
      } else {
        this.isLogin = false
        this.userData = null
      }
    })
  },
  methods: {
    googleLogin() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    },
  },
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
