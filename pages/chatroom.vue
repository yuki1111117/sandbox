<template>
  <div>
    <h1>Firebaseを使った読み書き確認</h1>
    <input v-model="message" />
    <v-btn @click="addMessage">メッセージを追加</v-btn>
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        {{ message.content }} index:{{ index }}
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
      message: '',
      messages: [],
    }
  },
  mounted() {
    firebase
      .database()
      .ref('slack')
      .on('value', (snapshot) => (this.messages = snapshot.val()))
  },
  methods: {
    addMessage() {
      firebase
        .database()
        .ref('slack')
        .push({
          content: this.message,
          user: {
            name: 'John Doe',
          },
        })
    },
  },
}
</script>
