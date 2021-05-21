// TODO search/index.vue自体を消す?
<template>
  <v-app>
    <v-img src="/assets/img/tamara-malaniy.jpg" max-height="30vh"></v-img>
    <search-key-add></search-key-add>
    <search-ranking itemPerPage="13"></search-ranking>
  </v-app>
</template>

<script>
import SearchRanking from '~/components/SearchRanking.vue'
import SearchKeyAdd from '~/components/SearchKeyAdd.vue'

export default {
  components: {
    SearchRanking,
    SearchKeyAdd,
  },
}
</script>
