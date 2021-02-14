<template>
  <div>
    <span>こんにちは, {{ userData.displayName }}さん</span>
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
import { mapState } from 'vuex'
export default {
  data() {
    return { note_content: 'hello' }
  },
  computed: mapState(['userData']),
  methods: {
    logout() {
      firebase.auth().signOut()
    },
    saveContent(value) {
      firebase
        .database()
        .ref('memo/' + this.userData.uid)
        .set({ content: value })
    },
  },
}
</script>
