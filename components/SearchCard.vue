<template>
  <v-card elevation="0" color="background">
    <a :href="searchLink">
      <div>
        <v-card-text class="cardRankingInfo">
          {{ index + 1 }}
        </v-card-text>
        <b @click.prevent="addUseCount"> {{ linkName }} </b>
      </div>
    </a>
    <div class="cardText">
      <v-row justify="start">
        <v-card-actions class="searchActions">
          <v-icon class="iconBtn" size="12px" color="fontcolor">
            mdi mdi-pencil
          </v-icon>
          <v-icon
            class="iconBtn"
            size="12px"
            color="fontcolor"
            @click="deleteMessage"
          >
            mdi mdi-eraser
          </v-icon>
          <div class="iconBtn" @click="addGoodCount">
            <v-icon size="12px" color="fontcolor"> mdi-heart </v-icon>
            <span class="infoText">{{ goodCount }}</span>
          </div>
          <div class="iconBtn">
            <v-icon size="12px" color="fontcolor">
              mdi-hand-pointing-up
            </v-icon>
            <span class="infoText">{{ useCount }}</span>
          </div>
          <nuxt-link :to="'/search/' + linkNameEdited">
            <v-icon size="12px" color="fontcolor"> mdi-message </v-icon>
          </nuxt-link>
          <span class="infoText">-1</span>
        </v-card-actions>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      //  ランキングの順位を示す
      type: Number,
      required: false,
      default: 0,
    },
    linkName: {
      type: String,
      required: false,
      default: 'No linkName',
    },
  },
  data() {
    return {
      engine: 'https://duckduckgo.com/',
    }
  },
  computed: {
    ...mapState(['userData']),
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
    searchLink() {
      const link = this.engine + this.linkName
      return link
    },
    // search>*id*>count以下のオブジェクトの数を検索リンクの使用カウント数とする
    useCount() {
      if (this.item.click) {
        return Object.keys(this.item.click).length
      } else {
        return 0
      }
    },
    // search>*id*>good以下のオブジェクトの数を検索リンクの使用カウント数とする
    goodCount() {
      if (this.item.good) {
        return Object.keys(this.item.good).length
      } else {
        return 0
      }
    },
    // linkNameからタイトルをつけ .:を変換する
    linkNameEdited() {
      let value = this.linkName.replace('%2E', '.')
      value = value.replace('%3A', ':')
      return value
    },
    urlId() {
      if (this.$route.params.id) {
        const value = this.$route.params.id.replace(/\./g, '%2E')
        return value
      } else {
        return null
      }
    },
  },
  mounted() {
    // todo いらないかも
    /* eslint-disable */
    this.item.key = this.item.key.replace(/\./g, '%2E')
    /* eslint-enable */
  },
  methods: {
    //  検索文字列をクリックしたら一回カウントする
    addUseCount() {
      //  カウント用のIDを作成する
      const countKey = firebase
        .database()
        .ref('search')
        .child(this.linkNameEdited)
        .child('click')
        .push().key

      //   作成したIDをもとにクリックした回数と詳細情報をオブジェクトで記録する
      firebase
        .database()
        .ref('search')
        .child(this.linkNameEdited)
        .child('click')
        .child(countKey)
        .set({
          key: countKey,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          uid: this.userDataChecked.uid,
        })

      //  検索リンクに飛ばす
      window.open(this.searchLink)
    },
    //  TODOいいねボタンを追加
    //  いいねボタンをクリックしたら一回カウントする
    addGoodCount() {
      //  カウント用のIDを作成する
      const countKey = firebase
        .database()
        .ref('search')
        .child(this.linkNameEdited)
        .child('good')
        .push().key

      //   作成したIDをもとにクリックした回数と詳細情報をオブジェクトで記録する
      firebase
        .database()
        .ref('search')
        .child(this.linkNameEdited)
        .child('good')
        .child(countKey)
        .set({
          key: countKey,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          uid: this.userDataChecked.uid,
        })
    },
    deleteMessage() {
      //  引数idがあるなら
      if (this.urlId) {
        //  thenData以下の指定データを削除
        firebase
          .database()
          .ref('search')
          .child(this.urlId)
          .child('thenData')
          .child(this.linkNameEdited)
          .remove()
      } else {
        // ないならsearch直下の指定データを削除する
        firebase.database().ref('search').child(this.linkNameEdited).remove()
      }
    },
  },
}
</script>

<style scoped>
.infoText {
  font-size: 12px;
}

.cardText {
  display: block;
  width: 100%;
}

.cardRankingInfo {
  display: inline;
  font-size: 12px;
  padding-top: 0px;
  padding-left: 0px;
  padding-bottom: 0px;
  padding-right: 5px;
}

.iconBtn {
  margin-right: 12px;
}

.searchActions {
  padding-left: 11px;
}
</style>
