<template>
  <v-app>
    <v-img src="/assets/img/tamara-malaniy.jpg" max-height="30vh"></v-img>
    <search-card :item="remoteData"></search-card>
    <search-key-add :id="urlId"></search-key-add>
    <search-ranking :id="urlId" itemPerPage="10"></search-ranking>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import SearchCard from '~/components/SearchCard.vue'
import SearchRanking from '~/components/SearchRanking.vue'
import SearchKeyAdd from '~/components/SearchKeyAdd.vue'

export default {
  components: {
    SearchCard,
    SearchRanking,
    SearchKeyAdd,
  },
  asyncData() {
    return {
      remoteData: {},
    }
  },

  data() {
    return {
      engine: 'https://duckduckgo.com/',
    }
  },

  computed: {
    urlId() {
      //  ピリオドがfirebaseで使えないので変換する
      const value = this.$route.params.id.replace(/\./g, '%2E')
      return value
    },
  },

  mounted() {
    if (this.urlId) {
      //  URLをidとする。取得するデータをidで指定してremoteDataにセットする
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
  },
}
</script>
