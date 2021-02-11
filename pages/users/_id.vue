<template>
  <div>
    <h1>User.ID: {{ user.id }}</h1>
    <h1>User.Name: {{ user.name }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    user() {
      return this.$store.state.users.find((user) => user.id == this.id) // eslint-disable-line
    },
  },
}
</script>
