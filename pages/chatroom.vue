<template>
  <v-app>
    <marquee>つぶやくからよ</marquee>
    <h1>チャットルームだからよ</h1>
    <v-text-field v-model="chat" label="はむが書き込むところだからよ" />
    <v-btn @click="addMessage"> 書き込む </v-btn>
    <v-row class="fill-height bg">
      <Chat title="チャットするとこ" sortBy="time"></Chat>
      <Chat title="チャットするとこ" sortBy="time"></Chat>
      <Chat title="チャットするとこ" sortBy="time"></Chat>
      <Chat title="チャットするとこ" sortBy="time"></Chat>
      <Chat title="チャットするとこ" sortBy="time"></Chat>
      <Chat title="チャットするとこ" sortBy="time"></Chat>
    </v-row>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import Chat from '~/components/chat.vue'

export default {
  components: {
    Chat,
  },
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
        '-' +
        time.getMonth() +
        '-' +
        time.getDate() +
        ' ' +
        time.getHours() +
        ':' +
        time.getMinutes() +
        ':' +
        time.getSeconds()
      firebase.database().ref('chats').push({
        chat: this.chat,
        time: this.now,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        nickName: 'はむちん',
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

<style>
.bg {
  background-image: url('~assets/img/057-23.jpg');
  background-repeat: repeat;
  background-size: 500px;
  width: 100%;
  height: auto;
}
</style>
