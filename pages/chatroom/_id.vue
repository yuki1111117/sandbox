<template>
  <v-app>
    <h1>チャット個別ページ{{ this.$route.params.id }}</h1>
    {{ chatsRemoteData }}
    <ChatCard :item="chatsRemoteData"></ChatCard>
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
      chatsRemoteData: {
        chat: '',
        createdAt: 0,
        good: 0,
        goodObj: { count: 0 },
        key: '',
        nickName: '',
        time: '',
      },
    }
  },
  data() {
    return { urlId: this.$route.params.id }
  },
  mounted() {
    if (this.urlId) {
      firebase
        .database()
        .ref('chats')
        .child(this.urlId)
        .on('value', (snapshot) => (this.chatsRemoteData = snapshot.val()))
    }
  },
  updated() {
    this.chatsRemoteData.key = this.urlId
  },
}
</script>
