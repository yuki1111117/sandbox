<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="2" xl="3">
      <v-text-field v-model="title" label="Title"></v-text-field>
      <v-text-field v-model="sortBy" label="SortBy"></v-text-field>
      <v-text-field
        v-model="page"
        label="ItemPerPage"
        type="Number"
      ></v-text-field>
    </v-col>
    <ChatRanking
      :title="title"
      :sortBy="sortBy"
      :itemPerPage="itemPerPage"
    ></ChatRanking>
    <ChatRanking
      title="チャットするとこ"
      sortBy="time"
      :itemPerPage="itemPerPage"
    ></ChatRanking>
    <v-col cols="12" sm="12" md="12" lg="2" xl="3">
      <v-text-field v-model="title" label="Title"></v-text-field>
      <v-text-field v-model="sortBy" label="SortBy"></v-text-field>
      <v-text-field
        v-model="page"
        label="ItemPerPage"
        type="Number"
      ></v-text-field>
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
      title: 'Title',
      sortBy: 'good',
      page: 3,
      compareObj: {
        title: 'CompareTitle',
        sortBy: 'time',
        page: 2,
      },
    }
  },
  computed: {
    itemPerPage() {
      return Number(this.page)
    },
  },
}
</script>
