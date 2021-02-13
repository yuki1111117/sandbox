<template>
  <div id="mypage">
    <span>こんにちは, {{ user.displayName }}さん</span>
    <p>
      <button @click="logout">ログアウト</button>
    </p>
    <p><textarea v-model="note_content"></textarea></p>
    <p>
      <button @click="saveContent(note_content)">ノートを保存する</button>
    </p>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
export default {
  name: 'MyPage',
  props: ['user'],
  data(context) {
    // コンポーネントをロードする前に毎回呼び出されます
    return { note_content: 'hello' }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
    },
    saveContent(value) {
      // 新しいテキストのためのキーを取得
      const newNoteKey = firebase.database().ref().child('notes').push().key
      firebase
        .database()
        .ref('notes/' + this.user.uid + '/' + newNoteKey)
        .set({ content: value })
    },
  },
}
</script>
