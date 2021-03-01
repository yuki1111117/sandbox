<template lang="pug">
v-col(cols='12' sm='6' md='6' lg='4' xl='3')
  nuxt-link(to='/chatroom/test')
    h2 {{ title }}
  v-card(color='chat' width='100%')
    v-data-iterator(:items='chatsValuesWithKeys' :sort-by='sortBy.toLowerCase()' :sort-desc='sortDesc' :items-per-page='itemPerPage' :hide-default-footer='true')
      template(#default='{ items }')
        v-list-item.itemPadding(v-for='(value, i) in items' :key='value.key')
          ChatCard( :item='value' :index='i')
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
      default: 'Ranking',
    },
    sortBy: {
      type: String,
      required: false,
      default: 'good',
    },
    itemPerPage: {
      type: Number,
      required: false,
      default: 2,
    },
  },
  data() {
    return {
      props: ['testmsg'],
      chatsRemoteData: {},
      sortDesc: true,
      headers: [
        { text: 'Chat', value: 'chat' },
        { text: 'NickName', value: 'nickName' },
        { text: 'Good', value: 'good' },
        { text: 'Time', value: 'time' },
      ],
    }
  },
  computed: {
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
