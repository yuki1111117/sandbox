<template>
  <v-app>
    <v-img src="/hamu.jpg" max-height="30vh" aspect-ratio="1.7"></v-img>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <SearchRanking :itemPerPage="10"></SearchRanking>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import SearchRanking from '~/components/SearchRanking.vue'

export default {
  components: {
    SearchRanking,
  },
}
</script>
