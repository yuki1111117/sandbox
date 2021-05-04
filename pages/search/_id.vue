<template>
  <v-app>
    <v-img src="/assets/img/tamara-malaniy.jpg" max-height="30vh"></v-img>
    <search-card :item="remoteData"></search-card>
    <v-card>
      <v-btn color="primary" @click="addKeyword"> ADD </v-btn>
      <v-combobox
        v-model="model"
        :items="items"
        hide-selected
        label="検索するキーワードを入れてください"
        multiple
        small-chips
      >
      </v-combobox>
    </v-card>
    <search-ranking :nestKey="urlId"></search-ranking>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import SearchCard from '~/components/SearchCard.vue'
import SearchRanking from '~/components/SearchRanking.vue'

export default {
  components: {
    SearchCard,
    SearchRanking,
  },
  asyncData() {
    return {
      remoteData: {},
    }
  },

  data() {
    return {
      // combobox
      model: [],
      engine: 'https://duckduckgo.com/',
      items: [],
      // combobox END
    }
  },

  computed: {
    urlId() {
      const value = this.$route.params.id.replace(/\./g, '%2E')
      return value
    },
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

  methods: {
    addKeyword() {
      if (this.model === []) {
        return
      }
      // create url
      let q = ''
      this.model.forEach((e) => {
        q = q.concat(e).concat('+')
      })
      q = q.slice(0, -1)
      // create url END
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .child('thenData')
        .child(q)
        .set({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          key: q,
        })
    },
  },
}
</script>
