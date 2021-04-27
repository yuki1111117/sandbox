<template>
  <v-app>
    <v-parallax dark src="/tamara-malaniy.jpg"> </v-parallax>
    <h1>チャットルームだからよ</h1>
    <v-text-field
      v-model="chat"
      label="はむが書き込むところだからよ"
    ></v-text-field>
    <v-btn color="primary" @click="addMessage"> 書き込む </v-btn>
    <v-row class="fill-height">
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
      <ChatRanking title="チャットするとこ" sortBy="time"></ChatRanking>
    </v-row>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import ChatRanking from '~/components/chatRanking.vue'

export default {
  components: {
    ChatRanking,
  },
  data() {
    return {
      chat: '眠いなあ',
      chats: [],
      now: '',
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
      const cardKey = firebase.database().ref('chats').push().key
      firebase
        .database()
        .ref('chats')
        .child(cardKey)
        .set({
          chat: this.chat,
          time: this.now,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          nickName: 'はむちん',
          good: 0,
          goodObj: { count: 0 },
          done: false,
          key: cardKey,
        })
    },
  },
}
</script>

<style></style>
