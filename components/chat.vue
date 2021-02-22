<template>
  <v-col cols="12" sm="6" md="5" lg="4" xl="3">
    <h2>総合いいね数ランキング</h2>
    <v-card color="chat" width="100%">
      <v-data-iterator
        :items="chatsValuesWithKeys"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        :items-per-page="1000"
        :hide-default-footer="true"
      >
        <template #default="{ items }">
          <v-list-item
            v-for="(item, index) in items"
            :key="item.key"
            class="itemPadding"
          >
            <div class="cardContainer">
              <div class="cardAvator">
                <v-card-text class="cardRankingInfo text--disabled">
                  {{ index + 1 }}
                </v-card-text>
                <v-avatar size="40px" rounded>
                  <v-img src="/hamu.jpg"></v-img>
                </v-avatar>
              </div>
              <div class="cardText">
                <div class="cardInfoTop d-flex justify-space-between">
                  <v-card-text class="cardInfo text--secondary">
                    {{ item.nickName }}
                  </v-card-text>
                  <v-card-text class="cardInfo text--disabled">
                    <v-spacer></v-spacer>
                    {{ item.time }}
                  </v-card-text>
                </div>
                <v-card-text class="cardTitleText font-weight-normal">
                  {{ item.chat }}
                </v-card-text>

                <v-row justify="end">
                  <v-card-actions class="text--disabled">
                    <v-icon
                      size="12px"
                      color="rgba(255, 255, 255, 0.5)"
                      @click="deleteMessage(item)"
                    >
                      mdi mdi-eraser
                    </v-icon>
                    <v-icon
                      size="12px"
                      color="rgba(255, 255, 255, 0.5)"
                      @click="goodMessage(item)"
                    >
                      mdi-heart
                    </v-icon>
                    <span class="infoText">{{ item.good }}</span>
                    <v-icon size="12px" color="rgba(255, 255, 255, 0.5)">
                      mdi mdi-cursor-pointer
                    </v-icon>
                    <span class="infoText">45</span>
                    <v-card-text class="cardInfo text--disabled"></v-card-text>
                  </v-card-actions>
                </v-row>
              </div>
            </div>
          </v-list-item>
        </template>
      </v-data-iterator>
    </v-card>
  </v-col>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  data() {
    return {
      chatsRemoteData: {},
      sortBy: 'good',
      sortDesc: true,
      headers: [
        { text: 'Chat', value: 'chat' },
        { text: 'NickName', value: 'nickName' },
        { text: 'Good', value: 'good' },
        { text: 'Time', value: 'time' },
      ],
    }
  },
  computed: {
    chatsValues() {
      return Object.values(this.chatsRemoteData)
    },
    chatsKeys() {
      return Object.keys(this.chatsRemoteData)
    },
    chatsValuesWithKeys() {
      this.chatsValues.map(
        (value, index) => (value.key = this.chatsKeys[index])
      )
      return this.chatsValues
    },
  },
  mounted() {
    firebase
      .database()
      .ref('chats')
      .on('value', (snapshot) => (this.chatsRemoteData = snapshot.val()))
  },
  methods: {
    deleteMessage(item) {
      firebase.database().ref('chats').child(item.key).remove()
    },
    goodMessage(item) {
      firebase
        .database()
        .ref('chats')
        .child(item.key)
        .child('good')
        .on('value', (snapshot) => (this.good = snapshot.val()))
      firebase
        .database()
        .ref('chats')
        .child(item.key)
        .update({ good: this.good + 1 })
    },
  },
}
</script>

<style scoped>
.reset {
  padding-top: 0px;
  padding-left: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  font-size: inherit;
}

.infoText {
  font-size: 12px;
}
.itemPadding {
  padding-top: 8px;
  padding-bottom: 10px;
  padding-left: 8px;
}

.cardContainer {
  display: flex;
  width: 100%;
  /* 以下第０版さんより拝借もの */
  background-color: #fff; /* 背景色 */
  border: 1px solid #ccc; /* 線の太さ・種類・色 */
  box-shadow: 1px 1px 6px 0px #ccc;
  -moz-box-shadow: 1px 1px 6px 0px #ccc;
  -webkit-box-shadow: 1px 1px 6px 0px #ccc;
  -o-box-shadow: 1px 1px 6px 0px #ccc;
  margin: 20px 5px; /* 外側の余白 上下・左右 */
  padding: 30px 20px 20px 20px; /* 内側の余白 上・右・下・左 */
  position: relative;
  z-index: 0;
}

.cardContainer:after {
  /* 以下第０版さんより拝借もの */
  background-color: #d9ccb3; /* マステ部分の色1 */
  background-image: linear-gradient(
      45deg,
      #dfd4be 25%,
      transparent 25%,
      transparent 75%,
      #dfd4be 75%,
      #dfd4be
    ),
    linear-gradient(
      45deg,
      #dfd4be 25%,
      transparent 25%,
      transparent 75%,
      #dfd4be 75%,
      #dfd4be
    ); /* マステ部分の色2 */
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
  border-left: 2px dotted rgba(255, 255, 255, 0.9);
  border-right: 2px dotted rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  content: 'はむの一言';
  display: block;
  margin: 0 0 10px 0;
  padding: 5px 20px;
  color: #fff; /* マステ部分文字色 */
  text-align: center;
  position: absolute;
  top: -10px;
  left: 20px;
  transform: rotate(-3deg);
  -moz-transform: rotate(-3deg);
  -webkit-transform: rotate(-3deg);
  -o-transform: rotate(-3deg);
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

.cardComment {
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
</style>
