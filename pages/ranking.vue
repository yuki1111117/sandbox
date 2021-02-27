<template>
  <v-app>
    <v-row class="fill-height">
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
      <Chat></Chat>
    </v-row>
  </v-app>
</template>

<script>
import Chat from '~/components/chatRanking.vue'

export default {
  components: {
    Chat,
  },
}
</script>
