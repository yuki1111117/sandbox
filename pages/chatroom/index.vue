<template lang="pug">
v-app
  marquee つぶやくからよ
  h1 チャットルームだからよ
  v-text-field(v-model='chat' label='はむが書き込むところだからよ')
  v-btn(@click='addMessage')  書き込む 
  v-row.fill-height.bg
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
    ChatRanking(title='チャットするとこ' sortBy='time' itemPerPage='2')
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
      firebase.database().ref('chats').push({
        chat: this.chat,
        time: this.now,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        nickName: 'はむちん',
        good: 0,
        done: false,
        key: cardKey,
      })
    },
  },
}
</script>

<style>
.bg {
  background-image: url('~assets/img/057-23.jpg');
  background-repeat: repeat;
  background-size: 500px;
  height: auto;
}
</style>
