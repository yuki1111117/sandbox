<template>
  <section class="container">
    <div>
      <hamu-logo />
      <h1 class="title">
        {{ name }}
      </h1>
      <h2 class="subtitle">
        Nuxt.jsとFirebaseを使って簡単なWebサービスを作るテストです。
      </h2>

      <div class="links">
        <Home v-if="!isLogin"></Home>
        <MyPage v-if="isLogin" :user="userData"></MyPage>
      </div>
    </div>

    <h2>ユーザ登録画面</h2>
    <div class="row">
      <div class="col-sm-8">
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="email">メールアドレス:</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="password">パスワード:</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
            />
          </div>
          <button type="submit" class="btn btn-info">登録</button>
        </form>
      </div>
    </div>
    <v-switch v-model="$vuetify.theme.dark" primary label="Dark"></v-switch>
  </section>
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
  asyncData(context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { name: 'Hello, World！！', isLogin: false, userData: null }
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
