<template>
  <v-card elevation="0" color="background">
    <v-card-text class="cardRankingInfo text--disabled">
      {{ index + 1 }}
    </v-card-text>

    <v-btn elevation="0" color="primary" @click.prevent="addCount">
      <b> {{ item.key }} </b>
    </v-btn>

    <div class="cardText">
      <v-card-text class="cardTitleText font-weight-normal">
        {{ item.chat }}
      </v-card-text>
      <v-row justify="start">
        <v-card-actions class="text--disabled searchActions">
          <v-icon class="iconBtn" size="12px" color="fontcolor">
            mdi mdi-pencil
          </v-icon>
          <v-icon class="iconBtn" size="12px" color="fontcolor">
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
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      engine: 'https://duckduckgo.com/',
    }
  },
  computed: {
    searchLink() {
      const link = this.engine + this.item.key
      return link
    },
    ...mapState(['userData']),
    itemCount() {
      if (this.item.count) {
        return Object.keys(this.item.count).length
      } else {
        return 0
      }
    },
  },
  methods: {
    addCount() {
      // ADD Count
      const cardKey = firebase.database().ref('chats').push().key
      firebase
        .database()
        .ref('search')
        .child(this.item.key)
        .child('count')
        .child(cardKey)
        .set({
          key: cardKey,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          uid: this.userData.uid,
        })
      // ADD count END
      // SET link
      window.open(this.searchLink)
      // SET link END
    },
  },
}
</script>

<style scoped>
.infoText {
  font-size: 12px;
}

.cardContainer {
  display: flex;
  width: 100%;
}

.cardAvator {
  display: flex;
  padding-top: 4px;
}

.cardText {
  display: block;
  width: 100%;
}

.cardInfo {
  display: flex;
  font-size: 12px;
  padding-top: 0px;
  padding-left: 5px;
  padding-bottom: 0px;
  padding-right: 0px;
}

.cardRankingInfo {
  display: flex;
  font-size: 12px;
  padding-top: 0px;
  padding-left: 0px;
  padding-bottom: 0px;
  padding-right: 5px;
}

.cardInfoTop {
  display: flex;
}

.cardTitleText {
  font-size: 15px;
  letter-spacing: 0.05em;
  line-height: 1.3125;
  word-break: break-all;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  padding-left: 5px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.iconBtn {
  margin-right: 12px;
}

.searchActions {
  padding-left: 11px;
}

.searchKey {
  padding-bottom: 5px;
}
</style>
