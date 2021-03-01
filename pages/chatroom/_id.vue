<template>
  <v-app>
    <h1>チャット個別ページ{{ this.$route.params.id }}</h1>
    {{ chatsRemoteData }}
    <ChatCard :item="searchedObj"></ChatCard>
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
  asyncData() {
    return { chatsRemoteData: {}, searchedObj: {} }
  },
  mounted() {
    firebase
      .database()
      .ref('chats')
      .on('value', (snapshot) => (this.chatsRemoteData = snapshot.val()))
  },
  updated() {
    this.searchedObj = this.chatsRemoteData[this.$route.params.id]
    // firebase
    //   .database()
    //   .ref('chats')
    //   .child(this.$route.params.id)
    //   .on('value', (snapshot) => (this.searchedObj = snapshot.val()))
  },
  methods: {
    deleteMessage(item) {
      firebase.database().ref('chats').child(item.key).remove()
    },
    goodMessage(item) {
      firebase
        .database()
        .ref('chats')
        .child(item.key)
        .child('good')
        .on('value', (snapshot) => (this.good = snapshot.val()))
      firebase
        .database()
        .ref('chats')
        .child(item.key)
        .update({ good: this.good + 1 })
    },
  },
}
</script>
