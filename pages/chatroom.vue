<template>
  <div>
    <marquee>つぶやくからよ</marquee>
    <h1>読み書き確認だからよ</h1>
    <v-text-field v-model="chat" label="はむが書き込むところだからよ" />
    <v-btn @click="addMessage"> 書き込む </v-btn>
    <v-card class="mx-auto" max-width="auto">
      <v-list-item v-for="(value, index) in chats" :key="index">
        <v-card-text>
          <div>{{ value.user.name }} {{ value.time }}</div>
          <div class="text--primary">{{ value.chat }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn icon @click="deleteMessage(index)">
            <v-icon>mdi mdi-eraser</v-icon>
          </v-btn>
          <v-btn icon @click="goodMessage(index)">
            <v-icon>mdi mdi-thumb-up-outline</v-icon>
            {{ value.good }}
          </v-btn>
        </v-card-actions>
      </v-list-item>
    </v-card>
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
      now: '',
      good: 0,
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
      const time = new Date()
      this.now =
        time.getFullYear() +
        '年' +
        time.getMonth() +
        '月' +
        time.getDate() +
        '日' +
        time.getHours() +
        ':' +
        time.getMinutes() +
        ':' +
        time.getSeconds()
      firebase
        .database()
        .ref('chats')
        .push({
          chat: this.chat,
          time: this.now,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          user: {
            name: 'はむ',
          },
          good: 0,
        })
    },
    deleteMessage(index) {
      firebase.database().ref('chats').child(index).remove()
    },
    goodMessage(index) {
      firebase
        .database()
        .ref('chats')
        .child(index)
        .child('good')
        .on('value', (snapshot) => (this.good = snapshot.val()))
      firebase
        .database()
        .ref('chats')
        .child(index)
        .update({ good: this.good + 1 })
    },
  },
}
</script>
