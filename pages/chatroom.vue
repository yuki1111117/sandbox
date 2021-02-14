<template>
  <div>
    <marquee>つぶやくからよ</marquee>
    <h1>Firebaseを使った読み書き確認だからよ</h1>
    <v-text-field v-model="chat" label="はむが書き込むところだからよ" />
    <v-btn @click="addMessage">書き込む </v-btn>
    <ul>
      <li v-for="(value, index) in chats" :key="index">
        {{ value.user.name }}が{{ value.chat }}って言ってる
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  name: 'Home',
  data() {
    return {
      chat: '眠いなあ',
      chats: [],
    }
  },
  mounted() {
    firebase
      .database()
      .ref('chats')
      .on('value', (snapshot) => (this.chats = snapshot.val()))
  },
  methods: {
    addMessage() {
      firebase
        .database()
        .ref('chats')
        .push({
          chat: this.chat,
          user: {
            name: 'はむ',
          },
        })
    },
  },
}
</script>
