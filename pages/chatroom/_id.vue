<template>
  <v-app>
    <h1>チャット個別ページ{{ this.$route.params.id }}</h1>
    <div v-show="false">{{ chatsRemoteData }}</div>
    <ChatCard :item="searchedObj" @from-child="alertMessage"></ChatCard>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import ChatCard from '~/components/chatCard.vue'

export default {
  components: {
    ChatCard,
  },
  asyncData() {
    return {
      chatsRemoteData: {},
      searchedObj: {
        chat: '眠いなあ',
        createdAt: 1614603094812,
        good: 1,
        key: '-dummy',
        nickName: 'はむちん',
        time: '2121-2-1 21:51:35',
      },
    }
  },
  data() {
    return { urlId: this.$route.params.id }
  },
  mounted() {
    firebase
      .database()
      .ref('chats')
      .on('value', (snapshot) => (this.chatsRemoteData = snapshot.val()))
  },
  updated() {
    this.searchedObj = this.chatsRemoteData[this.urlId]
    if (this.urlId) {
      this.searchedObj.key = this.urlId
    }
  },
  methods: {
    alertMessage(item) {
      firebase
        .database()
        .ref('chats')
        .child(item.key)
        .update({ good: item.good + 1 })
      this.searchedObj.key = this.urlId
    },
  },
}
</script>
