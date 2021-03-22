<template>
  <v-card elevation="0">
    <p>Link:{{ item.key }}</p>
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
    return {}
  },
}
</script>

<style scoped></style>
