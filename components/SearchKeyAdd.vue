<template>
  <v-card color="background">
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
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  props: {
    id: {
      type: String,
      //    キーワードを保存する場所を指定するため、requireにする
      required: require,
      default: null,
    },
  },
  data() {
    return {
      ...mapState(['userData']),
      model: [],
    }
  },
  computed: {
    userDataChecked() {
      // ログインしているかチェックする
      if (this.userData) {
        //  ログインしているならユーザーデータを返す
        return this.userData
      } else {
        //  ログインしていないならnullを返す
        return null
      }
    },
  },
  methods: {
    addKeyword() {
      if (this.model === []) {
        // コンボボックスに入力してないなら無効にする
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
      //   TODO IDがないなら大本の所にデータを保存する
      if (this.id == null) {
        firebase.database().ref('search').child(q).update({
          key: q,
        })
      } else {
        //   TODO IDがあるならIDの所にデータを保存して、大本の所にもデータを保存する
        firebase
          .database()
          .ref('search')
          .child(this.id)
          .child('thenData')
          .child(q)
          .update({})
        firebase.database().ref('search').child(q).update({})
      }
    },
  },
}
</script>
