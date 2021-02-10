<template>
  <div>
    <h1>記事一覧</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <nuxt-link :to="'/posts/' + post.id">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const posts = await context.$axios.$get('/posts/')
    return { posts }
  },
}
</script>
