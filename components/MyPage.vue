<template>
  <div>
    <span>こんにちは, {{ user.displayName }}さん</span>
    <p>
      <button @click="logout">ログアウト</button>
    </p>
    <p><textarea v-model="note_content"></textarea></p>
    <p>
      <button @click="saveContent(note_content)">メモを保存する</button>
    </p>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
export default {
  props: ['user'],
  data() {
    return { note_content: 'hello' }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
    },
    saveContent(value) {
      firebase
        .database()
        .ref('memo/' + this.user.uid)
        .set({ content: value })
    },
  },
}
</script>
