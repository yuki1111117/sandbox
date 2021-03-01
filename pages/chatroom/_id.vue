<template>
  <v-app>
    <h1>チャット個別ページ{{ this.$route.params.id }}</h1>
    {{ chatsRemoteData }}
    <ChatCard :item="searchedObj" @from-child="alertMessage"></ChatCard>
    {{ searchedObj }}
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

  data() {
    return {
      urlId: this.$route.params.id,
      chatsRemoteData: {},
      searchedObj: {},
    }
  },
  mounted() {
    firebase
      .database()
      .ref('chats')
      .on('value', (snapshot) => (this.chatsRemoteData = snapshot.val()))
    this.searchedObj = this.chatsRemoteData[this.urlId]
  },
  updated() {
    this.searchedObj = this.chatsRemoteData[this.urlId]
    this.searchedObj.key = this.urlId
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
