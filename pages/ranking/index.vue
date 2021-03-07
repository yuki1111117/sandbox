<template>
  <v-app>
    <v-row class="fill-height">
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
      <ChatRanking></ChatRanking>
    </v-row>
  </v-app>
</template>

<script>
import ChatRanking from '~/components/chatRanking.vue'

export default {
  components: {
    ChatRanking,
  },
}
</script>
