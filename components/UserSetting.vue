<template>
  <v-col dark>
    <p class="text-justify">こんにちは, {{ nickName }}さん</p>
    <v-btn @click="logout"> ログアウト </v-btn>
    <v-textarea v-model="note_content" solo name="input-7-4">
      v-model="note_content">
    </v-textarea>
    <v-btn @click="saveContent(note_content)"> メモを保存する </v-btn>
  </v-col>
</template>
<script>
import firebase from '@/plugins/firebase'
import { mapState } from 'vuex'
export default {
  data() {
    return { note_content: 'hello' }
  },
  computed: mapState(['ojUserData', 'nickName']),
  methods: {
    logout() {
      firebase.auth().signOut()
    },
    saveContent(value) {
      firebase
        .database()
        .ref('memo/' + this.ojUserData.uid)
        .set({ content: value })
    },
  },
}
</script>
