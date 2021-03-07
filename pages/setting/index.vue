<template>
  <div>
    <v-btn></v-btn>
    <ChatRanking
      title="チャットするとこ"
      sortBy="time"
      itemPerPage="3"
    ></ChatRanking>
  </div>
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
