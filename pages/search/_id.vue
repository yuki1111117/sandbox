<template>
  <v-app>
    <v-img src="/assets/img/tamara-malaniy.jpg" max-height="30vh"></v-img>
    <!-- search-card -->
    <!-- 役割：検索キーワードと詳細のデータを表示する -->
    <search-card :ojItem="remoteData" :srLinkName="srMainKey"></search-card>
    <search-key-add :srId="srMainKey"></search-key-add>
    <search-ranking :srId="srMainKey" itemPerPage="10"></search-ranking>
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

  computed: {
    srMainKey() {
      //  ピリオドがfirebaseで使えないので変換する
      const value = this.$route.params.id.replace(/\./g, '%2E')
      return value
    },
  },

  mounted() {
    if (this.srMainKey) {
      //  URLをidとする。取得するデータをidで指定してremoteDataにセットする
      firebase
        .database()
        .ref('search')
        .child(this.srMainKey)
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
  },
}
</script>
