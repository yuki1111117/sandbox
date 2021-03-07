<template>
  <v-row>
    <v-col cols="12" sm="3" md="3" lg="4" xl="5">
      <v-btn></v-btn>
    </v-col>
    <ChatRanking
      title="チャットするとこ"
      sortBy="time"
      itemPerPage="3"
    ></ChatRanking>
    <v-col cols="12" sm="3" md="3" lg="4" xl="4">
      <v-btn></v-btn>
    </v-col>
  </v-row>
</template>

<script>
import ChatRanking from '~/components/chatRanking.vue'
export default {
  components: {
    ChatRanking,
  },
  data() {
    return {
      title: '',
      sortby: '',
      itemPerPage: 1,
    }
  },
}
</script>
