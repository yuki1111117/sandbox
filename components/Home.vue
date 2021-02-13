<template>
  <v-app dark>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="title">{{ name }}</h1>
        <h1 class="display-1">メールでログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" />
          <v-text-field
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            label="パスワード"
          />
          <v-form>
            <v-card-actions>
              <v-btn class="info">ログイン</v-btn>
              <v-btn class="info" @click="googleLogin">googleでログイン</v-btn>
            </v-card-actions>
          </v-form>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  asyncData(context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { name: 'ログインテストだからよ', isLogin: false, userData: null }
  },
  methods: {
    googleLogin() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    },
  },
}
</script>
