<template>
  <v-col cols="12" sm="6" md="6" lg="4" xl="3">
    <nuxt-link to="/category/test">
      <h2 class="title">
        {{ srTitle }}
      </h2>
    </nuxt-link>
    <v-data-iterator
      :items="arRankingValues"
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
          <!-- search-card -->
          <!-- 役割：検索キーワードと詳細のデータを表示する -->
          <search-card
            :ojItem="value"
            :nmIndex="i"
            :srLinkName="ayRankingValuesWithKeys[i].key"
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
    // 何時:nuxt-linkで使用する。
    srTitle: {
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
    // srId
    //  役割:search/index.vueかsearch/_id.vueにいるのか判断する場合に使用する。
    srId: {
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
    // todo 修正予定
    arRankingValues() {
      const arValues = Object.values(this.remoteData)
      const arKeys = Object.keys(this.remoteData)
      if (arValues) {
        for (let i = 0; i < arValues.length; i++) {
          arValues[i].key = arKeys[i]
        }
      }
      return arValues
    },
    // todo いらないかも
    // 何時:search-cardで使用する。
    ayRankingValuesWithKeys() {
      return Object.entries(this.remoteData).map(([key, value]) => ({
        key,
        value,
      }))
    },
    srUrlId() {
      const value = this.$route.params.id.replace(/\./g, '%2E')
      return value
    },
  },
  mounted() {
    // srIdが渡されたら
    if (this.srId) {
      // thenDataを使用する
      firebase
        .database()
        .ref('search')
        .child(this.srUrlId)
        .child('thenData')
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    } else {
      // srIdが渡されなかったら
      // search以下のデータをそのまま使う
      firebase
        .database()
        .ref('search')
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
    if (
      //  srIdを渡され、thenDataにデータがある場合
      this.srId &&
      Object.prototype.hasOwnProperty.call(
        this.remoteData[this.srId],
        'thenData'
      )
    ) {
      //  rankingValueにthenData以下のデータを入れる
      this.rankingValue = Object.values(this.remoteData[this.srId].thenData)
    }
  },
  methods: {
    customSort(items) {
      /* eslint-disable */
      items.sort((a, b) => {
        /* eslint-enable */
        // どっちもある場合
        if (a.good && b.good) {
          const priceA = Object.keys(a['good']).length
          const priceB = Object.keys(b['good']).length
          //  昇順
          return priceB - priceA
        }
        // aがない場合
        if (!a.good && b.good) {
          const priceA = 0
          const priceB = Object.keys(b['good']).length
          //  昇順
          return priceB - priceA
        }
        // bがない場合
        if (a.good && !b.good) {
          const priceA = Object.keys(a['good']).length
          const priceB = 0
          //  昇順
          return priceB - priceA
        }
        // どっちもない場合
        if (!a.good && !b.good) {
          return 0
        }
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
