<template>
  <div>
    <h1>Counter</h1>
    <marquee>クッキー増やすからよ</marquee>
    <p>
      <button @click="incrementOne">不思議なぽっけだからよ</button>
    </p>
    <h1>クッキーが{{ count }}枚あるからよ</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState(['count']),
  methods: mapActions(['incrementOne']),
}
</script>
