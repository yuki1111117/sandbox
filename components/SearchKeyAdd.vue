<template>
  <v-card color="background">
    <!-- v-btn -->
    <!-- 役割:検索キーワードを追加する。 -->
    <v-btn color="primary" @click="addKeyword"> 追加 </v-btn>
    <v-combobox
      v-model="model"
      hide-selected
      label="検索するキーワードを入れてください"
      multiple
      small-chips
    >
    </v-combobox>
  </v-card>
</template>

<script>
// SearchKeyAdd.vue
// 何時:pages/search/index.vueもしくはpages/search/_id.vueで検索キーワードを追加するときに使用する。

// mapState
// 何時:obUserDataを取りだして、ログインしているか確認するときに使用する。
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  props: {
    // srId
    // 役割:開いているページがpages/search/index.vueなのかpages/search/_id.vueなのか判断するために使用する。
    // 何時:addKeyword()で、使用する。
    srId: {
      type: String,
      //    キーワードを保存する場所を指定するため、requireにする
      required: require,
      default: null,
    },
  },
  data() {
    return {
      ...mapState(['ojUserData']),
      // model
      // 何時:v-comboboxで検索キーワードを入力するときに使用する。
      model: [],
    }
  },
  methods: {
    // addKeyword()
    // 役割：検索キーワードをFirebaseに追加する。
    addKeyword() {
      if (this.model === []) {
        // コンボボックスに入力してないなら終了する。
        return
      }
      // qに入力したデータmodelを詰め込んでいく
      let q = ''
      this.model.forEach((e) => {
        // todo まとめて変換したい
        // .:を変換する
        e = e.replace('.', '%2E')
        e = e.replace(':', '%3A')
        // ＋で連結して詰め込める
        q = q.concat(e).concat('+')
      })
      q = q.slice(0, -1)
      // Firebaseのsearch直下にデータを保存する
      firebase.database().ref('search').child(q).update({
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      })
      // pages/search/_id.vueではsrIdを渡す
      if (this.srId !== null) {
        // srIdを受け取ったなら、Firebaseのsearch>"srId"の下にデータを保存する
        firebase
          .database()
          .ref('search')
          .child(this.srId)
          .child('thenData')
          .child(q)
          .update({
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          })
      }
    },
  },
}
</script>
