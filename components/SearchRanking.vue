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
      :custom-sort="customSort"
    >
      <template #default="{ items }">
        <v-list-item
          v-for="(value, i) in items"
          :key="value.key"
          class="itemPadding"
        >
          <search-card
            :item="value"
            :index="i"
            :linkName="rankingValuesWithKeys[i].key"
          ></search-card>
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
      default: 'good',
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
      remoteData: {},
      thenData: {},
      // true:降順?
      sortDesc: false,
    }
  },
  computed: {
    rankingValues() {
      return Object.values(this.remoteData)
    },
    // todo rankingKeysの削除のため作成
    rankingValuesWithKeys() {
      return Object.entries(this.remoteData).map(([key, value]) => ({
        key,
        value,
      }))
    },
    //  todo削除予定
    rankingKeys() {
      return Object.keys(this.remoteData)
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
    } else {
      // idが渡されなかったら
      // search以下のデータをそのまま使う
      firebase
        .database()
        .ref('search')
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
    if (
      //  idを渡され、thenDataにデータがある場合
      this.id &&
      Object.prototype.hasOwnProperty.call(this.remoteData[this.id], 'thenData')
    ) {
      //  rankingValueにthenData以下のデータを入れる
      this.rankingValue = Object.values(this.remoteData[this.id].thenData)
    }
  },
  methods: {
    customSort(items) {
      /* eslint-disable */
      items.sort((a, b) => {
        /* eslint-enable */
        const priceA = Object.keys(a['good']).length
        const priceB = Object.keys(b['good']).length
        //  昇順
        return priceB - priceA
      })
      return items
    },
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
