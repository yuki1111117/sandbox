<template>
  <v-col cols="12" sm="6" md="6" lg="4" xl="3">
    <nuxt-link to="/category/test">
      <h2 class="title">{{ title }}</h2>
    </nuxt-link>
    <v-data-iterator
      :items="rankingValues"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      :items-per-page.sync="itemPerPage"
      :hide-default-footer="true"
    >
      <template #default="{ items }">
        <v-list-item
          v-for="(value, i) in items"
          :key="value.key"
          class="itemPadding"
        >
          ranking/id:{{ id }}
          <search-card :id="idTest" :item="value" :index="i"></search-card>
        </v-list-item>
      </template>
    </v-data-iterator>
  </v-col>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import SearchCard from '~/components/SearchCard.vue'

export default {
  components: {
    SearchCard,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'SearchRanking',
    },
    sortBy: {
      type: String,
      required: false,
      default: 'counter',
    },
    itemPerPage: {
      type: Number,
      required: false,
      default: 3,
    },
    // thenのランキング出すときに使用する
    id: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      props: ['testmsg'],
      remoteData: {},
      thenData: {},
      sortDesc: true,
    }
  },
  computed: {
    rankingValues() {
      return Object.values(this.remoteData)
    },
    urlId() {
      const value = this.$route.params.id.replace(/\./g, '%2E')
      return value
    },
  },
  mounted() {
    // idが渡されたら
    if (this.id) {
      // thenDataを使用する
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .child('thenData')
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
      // thenData END
    } else {
      // idが渡されなかったら
      // search以下のデータをそのまま使う
      firebase
        .database()
        .ref('search')
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
    if (
      //  idとthenDataにデータがある場合
      this.id &&
      Object.prototype.hasOwnProperty.call(this.remoteData[this.id], 'thenData')
    ) {
      //  rankingValueにデータを入れる
      this.rankingValue = Object.values(this.remoteData[this.id].thenData)
    }
  },
}
</script>

<style scoped>
.itemPadding {
  padding-top: 8px;
  padding-bottom: 10px;
  padding-left: 8px;
}

.title {
  padding-bottom: 16px;
  padding-top: 16px;
}
</style>
