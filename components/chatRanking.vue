<template>
  <v-col cols="12" sm="6" md="6" lg="4" xl="3">
    <nuxt-link to="/category/test">
      <h2>{{ title }}</h2>
    </nuxt-link>
    <v-data-iterator
      :items="chatsValuesWithKeys"
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
          <ChatCard :item="value" :index="i"></ChatCard>
        </v-list-item>
      </template>
    </v-data-iterator>
  </v-col>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import ChatCard from '~/components/chatCard.vue'

export default {
  components: {
    ChatCard,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'ChatRanking',
    },
    sortBy: {
      type: String,
      required: false,
      default: 'good',
    },
    itemPerPage: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  data() {
    return {
      props: ['testmsg'],
      chatsRemoteData: {},
      sortDesc: true,
    }
  },
  computed: {
    headers() {
      const s = new Set()
      let f = null
      this.chatsValues.forEach((item) => {
        for (f in item) {
          s.add(f)
        }
      })
      return Array.from(s).map((a) => {
        return {
          value: a,
        }
      })
    },
    chatsValues() {
      return Object.values(this.chatsRemoteData)
    },
    chatsKeys() {
      return Object.keys(this.chatsRemoteData)
    },
    chatsValuesWithKeys() {
      this.chatsValues.map(
        (value, index) => (value.key = this.chatsKeys[index])
      )
      return this.chatsValues
    },
  },
  mounted() {
    firebase
      .database()
      .ref('chats')
      .on('value', (snapshot) => (this.chatsRemoteData = snapshot.val()))
  },
}
</script>

<style scoped lang="sass">
.itemPadding
  padding-top: 8px
  padding-bottom: 10px
  padding-left: 8px
</style>
