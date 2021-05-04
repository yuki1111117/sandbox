<template>
  <v-app>
    <v-img src="/assets/img/tamara-malaniy.jpg" max-height="30vh"></v-img>
    <v-container fluid>
      <v-btn color="primary" @click="jump"> search </v-btn>
      <v-combobox
        v-model="model"
        :items="items"
        hide-selected
        label="Add some tags"
        multiple
        small-chips
      >
      </v-combobox>
    </v-container>
    <search-ranking itemPerPage="13"></search-ranking>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import SearchRanking from '~/components/SearchRanking.vue'

export default {
  components: {
    SearchRanking,
  },
  data() {
    return {
      items: [],
      model: [],
      engine: 'https://duckduckgo.com/',
    }
  },

  // URL Search
  mounted() {
    if (!location.search) return
    const queryStr = decodeURI(window.location.search.slice(1)) // 文頭?を除外
    const queries = {}
    let q = ''
    queryStr.split('&').forEach(function (queryStr) {
      const queryArr = queryStr.split('=')
      queryArr[1].split('%20').forEach(function (e) {
        q = q.concat(e).concat(' ')
      })
      q = q.slice(0, -1)
      queries[queryArr[0]] = q
    })
    // For Error: Reference.child failed
    if (queries.q.match(/\./)) {
      queries.q = queries.q.replace(/\./g, '%2E')
    }

    const link = this.engine.concat('?').concat('q=').concat(queries.q)

    firebase.database().ref('search').child(queries.q).child('thenData').set({
      createdAt: -1,
      key: queries.q,
    })
    firebase
      .database()
      .ref('search')
      .child(queries.q)
      .update({
        key: queries.q,
        title: { key: queries.q },
        keywords: queries.q.split(' '),
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      })
      .then(() => location.assign(link))
  },
  // URL Search END

  methods: {
    jump() {
      if (this.model === []) {
        return
      }
      let q = 'q='
      this.model.forEach((e) => {
        q = q.concat(e).concat('+')
      })
      q = q.slice(0, -1)
      const cardKey = firebase.database().ref('search').push().key
      firebase.database().ref('search').child(q).set({
        keyword: q,
        key: cardKey,
      })
    },
  },
}
</script>
