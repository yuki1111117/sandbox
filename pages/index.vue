<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <hamu-logo />
      </div>
      <SearchRanking></SearchRanking>
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

<style scoped>
#cars {
  background-repeat: repeat;
  z-index: -1;
}
.car {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 20px;
  z-index: 1;
}
</style>
