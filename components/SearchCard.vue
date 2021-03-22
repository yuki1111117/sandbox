<template>
  <v-card elevation="0" color="background">
    <a :href="searchLink">
      <p>{{ item.key }}</p>
    </a>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      engine: 'https://duckduckgo.com/',
    }
  },
  computed: {
    searchLink() {
      const link = this.engine + this.item.key
      return link
    },
  },
}
</script>

<style scoped></style>
