<template>
  <div>
    <h1>ユーザ一覧</h1>
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users
    },
  },
  mounted() {
    this.$store.dispatch('getUsers')
  },
}
</script>
