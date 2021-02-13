<template>
  <v-app dark>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="title">
          {{ name }}
        </h1>
        <h1 class="display-1">ログイン＆新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="registerUser">
          <v-text-field
            v-model="email"
            prepend-icon="mdi-account-circle"
            label="メールアドレス"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード"
            @click:append="showPassword = !showPassword"
          />
          <v-card-actions>
            <v-btn class="info" type="submit" @click="registerUser">
              メールアドレスでログイン
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn class="info" @click="googleLogin"> googleでログイン </v-btn>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  data() {
    return { showPassword: false, email: '', password: '' }
  },
  methods: {
    googleLogin() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    },
    registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    },
  },
}
</script>
