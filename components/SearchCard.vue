<template>
  <v-card elevation="0" color="background">
    <!-- srSearchLink -->
    <!-- 役割:ホイールクリックした時、検索キーワードで検索したURLに飛ばす。 -->
    <a :href="srSearchLink">
      <div>
        <!-- cardRankingInfo -->
        <!-- 役割:検索キーワードのランキングの順位を示す -->
        <v-card-text class="cardRankingInfo">
          {{ nmIndex + 1 }}
        </v-card-text>
        <h3>
          <!-- srLinkNameForTitle -->
          <!-- 役割:検索キーワードの名前を示す。 -->
          <!-- addUseCount -->
          <!-- 役割:検索キーワードを左クリックした時、クリック数をカウントして、検索先URLに飛ばす。 -->
          <b @click.prevent="addUseCount"> {{ srLinkNameForTitle }} </b>
        </h3>
      </div>
    </a>
    <div class="cardText">
      <v-row justify="start">
        <!-- searchActions -->
        <!-- 役割:検索キーワードに関する機能一覧を示す。 -->
        <v-card-actions class="searchActions">
          <!-- mdi-pencil -->
          <!-- 役割:編集ボタンを示す。 -->
          <v-icon class="iconBtn" size="12px" color="fontcolor">
            mdi mdi-pencil
          </v-icon>
          <!-- mdi-eraser -->
          <!-- 役割:削除ボタンを示す。 -->
          <v-icon
            class="iconBtn"
            size="12px"
            color="fontcolor"
            @click="deleteKeyword"
          >
            mdi mdi-eraser
          </v-icon>
          <!-- mdi-heart -->
          <!-- 役割:いいねボタンを示す。 -->
          <div class="iconBtn" @click="addGoodCount">
            <v-icon size="12px" color="fontcolor"> mdi-heart </v-icon>
            <!-- itGoodCount -->
            <!-- 役割:いいね数を示す。 -->
            <span class="infoText">{{ itGoodCount }}</span>
          </div>
          <!-- mdi-hand-pointing-up -->
          <!-- 役割:クリックボタンを示す。 -->
          <div class="iconBtn">
            <v-icon size="12px" color="fontcolor">
              mdi-hand-pointing-up
            </v-icon>
            <!-- itClickCount -->
            <!-- 役割:クリック数を示す。 -->
            <span class="infoText">{{ itClickCount }}</span>
          </div>
          <!-- mdi-message -->
          <!-- 役割:検索キーワードの詳細ページへ飛ぶボタンを示す。 -->
          <nuxt-link :to="'/search/' + srLinkNameEdited">
            <v-icon size="12px" color="fontcolor"> mdi-message </v-icon>
          </nuxt-link>
        </v-card-actions>
      </v-row>
    </div>
  </v-card>
</template>

<script>
// SearchCard.vue
// 目的:検索キーワードの表示、編集機能をまとめる。
// 役割:検索キーワードの表示、編集に使用する。検索キーワードの使用数等も表示する。検索、いいね、キーワードの削除を行う。
// 何時:主にSearchRanking.vueの下で使用する。pages/search/_id.vueの頭としても使用する。

// mapState
// 目的:ログインしているかどうか確認する。
// 役割:いいねしたとき、検索したときユーザーIDを記録するために使用する。
// 何時:userDataChecked()でログインしているか確認するときに使用する。
import { mapState } from 'vuex'

// firebase
// 目的:Firebaseにデータを集める。
// 何時:addUseCount(),addGoodCount(),deleteKeyword()で検索、いいね、削除を行ったときの記録をFirebaseで行うときに使用する。
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  props: {
    // ojItem
    // 目的:検索キーワードの詳細を含めたデータを受け取る。
    // 何時:itClickCount(),itGoodCount()で使用数、いいね数のデータを出すときに使用する。
    ojItem: {
      type: Object,
      required: true,
    },
    // nmIndex
    // 目的:ランキングの順位のデータを示す。
    nmIndex: {
      type: Number,
      required: false,
      default: 0,
    },
    // srLinkName
    // 役割:タイトルと検索先リンクを作成するため使用する。
    srLinkName: {
      type: String,
      required: false,
      default: 'No srLinkName',
    },
  },
  data() {
    return {
      // srEngineLink
      // 役割:検索キーワードで検索するため、検索エンジンのURLを示す。
      // 何時:srSearchLink()で、検索キーワードと検索エンジンのリンクを結合するときに使用する。
      srEngineLink: 'https://duckduckgo.com/',
    }
  },
  computed: {
    // ojUserData
    // 役割:ログイン状態を示すため使用する。
    // 何時:ayUserDataChecked()で、ログインしているかチェックするときに使用する。
    ...mapState(['ojUserData']),
    ayUserDataChecked() {
      // ログインしているかチェックする
      if (this.ojUserData) {
        //  ログインしているならユーザーデータを返す
        return this.ojUserData
      } else {
        //  ログインしていないならnullを返す
        return null
      }
    },
    // srSearchLink()
    // 何時:addUseCount()で、検索キーワードを左クリックした後、検索リンク先へ飛ばすために使用する。
    srSearchLink() {
      const link = this.srEngineLink + this.srLinkName
      return link
    },
    // search>*id*>count以下のオブジェクトの数を検索リンクの使用カウント数とする
    itClickCount() {
      if (this.ojItem && this.ojItem.click) {
        return Object.keys(this.ojItem.click).length
      }
      return 0
    },
    // search>*id*>good以下のオブジェクトの数を検索リンクの使用カウント数とする
    itGoodCount() {
      if (this.ojItem && this.ojItem.good) {
        return Object.keys(this.ojItem.good).length
      }
      return 0
    },
    // srLinkNameからタイトルをつけ .:を変換する
    srLinkNameEdited() {
      let value = this.srLinkName.replace('.', '%2E')
      value = value.replace(':', '%3A')
      return value
    },
    // srLinkNameからタイトルをつけ %2Eを .:に変換する
    srLinkNameForTitle() {
      let value = this.srLinkName.replace('%2E', '.')
      value = value.replace('%3A', ':')
      return value
    },
    ayUrlId() {
      if (this.$route.params.id) {
        const value = this.$route.params.id.replace(/\./g, '%2E')
        return value
      } else {
        return null
      }
    },
  },
  methods: {
    //  検索文字列をクリックしたら一回カウントする
    addUseCount() {
      //  カウント用のIDを作成する
      const countKey = firebase
        .database()
        .ref('search')
        .child(this.srLinkNameEdited)
        .child('click')
        .push().key

      //   作成したIDをもとにクリックした回数と詳細情報をオブジェクトで記録する
      firebase
        .database()
        .ref('search')
        .child(this.srLinkNameEdited)
        .child('click')
        .child(countKey)
        .set({
          key: countKey,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          uid: this.ayUserDataChecked.uid,
        })

      //  検索リンクに飛ばす
      window.open(this.srSearchLink)
    },
    //  TODOいいねボタンを追加
    //  いいねボタンをクリックしたら一回カウントする
    addGoodCount() {
      //  カウント用のIDを作成する
      const countKey = firebase
        .database()
        .ref('search')
        .child(this.srLinkNameEdited)
        .child('good')
        .push().key

      //   作成したIDをもとにクリックした回数と詳細情報をオブジェクトで記録する
      firebase
        .database()
        .ref('search')
        .child(this.srLinkNameEdited)
        .child('good')
        .child(countKey)
        .set({
          key: countKey,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          uid: this.ayUserDataChecked.uid,
        })
    },
    deleteKeyword() {
      //  引数idがあるなら
      if (this.ayUrlId) {
        //  thenData以下の指定データを削除
        firebase
          .database()
          .ref('search')
          .child(this.ayUrlId)
          .child('thenData')
          .child(this.srLinkNameEdited)
          .remove()
      } else {
        // ないならsearch直下の指定データを削除する
        firebase.database().ref('search').child(this.srLinkNameEdited).remove()
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
