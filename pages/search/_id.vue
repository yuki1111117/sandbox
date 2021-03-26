<template>
  <v-app>
    <h1>チャット個別ページ{{ this.$route.params.id }}</h1>
    {{ remoteData }}
    <SearchCard :item="remoteData"></SearchCard>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import SearchCard from '~/components/SearchCard.vue'

export default {
  components: {
    SearchCard,
  },
  asyncData() {
    return {
      remoteData: {},
    }
  },
  data() {
    return { urlId: this.$route.params.id }
  },
  mounted() {
    if (this.urlId) {
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
  },
  updated() {
    this.remoteData.key = this.urlId
  },
}
</script>
