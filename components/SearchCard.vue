<template>
  <v-card elevation="0" color="background">
    card/id: {{ id }}
    <a :href="searchLink">
      <div>
        <v-card-text class="cardRankingInfo">
          {{ index + 1 }}
        </v-card-text>
        <b @click.prevent="addCount"> {{ title }} </b>
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
            @click="deleteMessage(item)"
          >
            mdi mdi-eraser
          </v-icon>
          <div class="iconBtn">
            <v-icon size="12px" color="fontcolor"> mdi-heart </v-icon>
            <span class="infoText">-1</span>
          </div>
          <div class="iconBtn">
            <v-icon size="12px" color="fontcolor">
              mdi-hand-pointing-up
            </v-icon>
            <span class="infoText">{{ itemCount }}</span>
          </div>
          <nuxt-link :to="'/search/' + item.key">
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
    idTest: {
      //  使用するデータを指定する
      type: String,
      required: false,
      default: null,
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
      const link = this.engine + this.item.key
      return link
    },
    itemCount() {
      if (this.item.count) {
        return Object.keys(this.item.count).length
      } else {
        return 0
      }
    },
    title() {
      let value = this.item.key.replace('%2E', '.')
      value = value.replace('%3A', ':')
      return value
    },
  },
  mounted() {
    // For Error: Reference.child failed: First argument was an invalid path = "vue.js". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"d failed
    if (this.item.key.match(/\./)) {
      /* eslint-disable */
      this.item.key = this.item.key.replace(/\./g, '%2E')
      /* eslint-enable */
    }
    // For Error: Reference.child failed END
  },
  methods: {
    addCount() {
      // ADD Count
      const cardKey = firebase
        .database()
        .ref('search')
        .child(this.item.key)
        .child('count')
        .push().key
      firebase
        .database()
        .ref('search')
        .child(this.item.key)
        .child('count')
        .child(cardKey)
        .set({
          key: cardKey,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          uid: this.userDataChecked.uid,
          counter: this.itemCount,
        })
      // ADD count END
      // SET count of count object
      firebase.database().ref('search').child(this.item.key).update({
        counter: this.itemCount,
      })
      // SET count of count object END
      // SET link
      window.open(this.searchLink)
      // SET link END
    },
    deleteMessage(item) {
      //  引数idがあるなら
      if (this.id) {
        //  thenData以下の指定データを削除
        firebase
          .database()
          .ref('search')
          .ref(this.id)
          .ref('thenData')
          .child(item.key)
          .remove()
      } else {
        // ないならsearch直下の指定データを削除する
        firebase.database().ref('search').child(item.key).remove()
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
