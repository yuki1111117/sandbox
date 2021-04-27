<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <hamu-logo />
      </div>
      <SearchRanking :itemPerPage="10"></SearchRanking>
    </v-col>
  </v-row>
</template>

<script>
import HamuLogo from '~/components/HamuLogo.vue'
import SearchRanking from '~/components/SearchRanking.vue'

export default {
  components: {
    HamuLogo,
    SearchRanking,
  },
  computed: {
    message() {
      return this.$store.state.message
    },
  },
}
</script>
