<template>
  <v-col cols="12" sm="6" md="6" lg="4" xl="3">
    <nuxt-link to="/category/test">
      <h2 class="title">{{ title }}</h2>
    </nuxt-link>
    <v-data-iterator
      :items="valuesWithKeys"
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
      default: 'createdAt',
    },
    itemPerPage: {
      type: Number,
      required: false,
      default: 3,
    },
  },
  data() {
    return {
      props: ['testmsg'],
      remoteData: {},
      sortDesc: true,
    }
  },
  computed: {
    rankingValues() {
      return Object.values(this.remoteData)
    },
    chatsKeys() {
      return Object.keys(this.remoteData)
    },
    valuesWithKeys() {
      this.rankingValues.map(
        (value, index) => (value.key = this.chatsKeys[index])
      )
      return this.rankingValues
    },
  },
  mounted() {
    firebase
      .database()
      .ref('search')
      .on('value', (snapshot) => (this.remoteData = snapshot.val()))
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
