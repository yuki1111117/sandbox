// TODO index.vue自体を消す
<template>
  <v-app>
    <v-img src="/assets/img/tamara-malaniy.jpg" max-height="30vh"></v-img>
    <search-key-add></search-key-add>
    <search-ranking itemPerPage="13"></search-ranking>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import SearchRanking from '~/components/SearchRanking.vue'
import SearchKeyAdd from '~/components/SearchKeyAdd.vue'

export default {
  components: {
    SearchRanking,
    SearchKeyAdd,
  },
  data() {
    return {
      // todo vuexで管理する
      engine: 'https://duckduckgo.com/',
    }
  },

  // TODO 削除・・？何してるのかわからん
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
}
</script>
