<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="4" xl="4">
      <v-text-field label="Title"></v-text-field>
      <v-text-field label="SortBy"></v-text-field>
      <v-text-field label="ItemPerPage" type="Number"></v-text-field>
    </v-col>
    <ChatRanking
      title="チャットするとこ"
      sortBy="time"
      itemPerPage="3"
    ></ChatRanking>
    <ChatRanking
      title="チャットするとこ"
      sortBy="time"
      itemPerPage="3"
    ></ChatRanking>
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
