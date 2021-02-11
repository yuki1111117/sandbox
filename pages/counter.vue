<template>
  <div>
    <h1>Counter</h1>
    <marquee>クッキー増やすからよ</marquee>
    <p>
      <button @click="increment">不思議なぽっけだからよ</button>
    </p>
    <h1>クッキーが{{ count }}枚あるからよ</h1>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    },
  },
  methods: {
    increment() {
      this.$store.dispatch('incrementOne')
    },
  },
}
</script>
