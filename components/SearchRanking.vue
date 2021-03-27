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
          <SearchCard :item="value" :index="i"></SearchCard>
        </v-list-item>
      </template>
    </v-data-iterator>
    {{ rankingValue }}
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
    // nested item 'then'
    nestKey: {
      type: String,
      required: false,
      default: null,
    },
    // nested item 'then' END
  },
  data() {
    return {
      props: ['testmsg'],
      remoteData: {},
      thenData: {},
      sortDesc: true,
      urlId: this.$route.params.id,
    }
  },
  computed: {
    rankingValues() {
      return Object.values(this.remoteData)
    },
  },
  mounted() {
    // thenData
    if (this.nestKey) {
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .child('thenData')
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
      // thenData END
    } else {
      firebase
        .database()
        .ref('search')
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
    if (
      this.nestKey &&
      Object.prototype.hasOwnProperty.call(
        this.remoteData[this.nestKey],
        'thenData'
      )
    ) {
      this.rankingValue = Object.values(this.remoteData[this.nestKey].thenData)
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
