<template>
  <div>
    <h1>チャット個別ページ{{ this.$route.params.id }}</h1>
    <ChatCard :item="searchedObj"></ChatCard>
  </div>
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
  computed: {
    chatsValues() {
      return Object.values(this.chatsRemoteData)
    },
    chatsKeys() {
      return Object.keys(this.chatsRemoteData)
    },
    chatsValuesWithKeys() {
      this.chatsValues.map(
        (value, index) => (value.key = this.chatsKeys[index])
      )
      return this.chatsValues
    },
  },
  async mounted() {
    firebase
      .database()
      .ref('chats')
      .on('value', (snapshot) => (this.chatsRemoteData = snapshot.val()))
    await firebase
      .database()
      .ref('chats')
      .child(this.$route.params.id)
      .on('value', (snapshot) => (this.searchedObj = snapshot.val()))
    this.searchedObj.key = this.$route.params.id
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
