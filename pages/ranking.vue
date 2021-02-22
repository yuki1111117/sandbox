<template>
  <v-app>
    <v-row class="fill-height">
      <v-col cols="12" sm="6" md="5" lg="4" xl="3">
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
                    <v-avatar size="40px">
                      <v-img src="/hamu.jpg"></v-img>
                    </v-avatar>
                  </div>
                  <div class="cardText">
                    <v-card-text class="cardInfo text--disabled">
                      {{ index + 1 }}{{ item.nickName }} いいね数：{{
                        item.good
                      }}
                      {{ item.time }}
                    </v-card-text>
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
                        <v-icon size="12px" color="rgba(255, 255, 255, 0.5)">
                          mdi-heart
                        </v-icon>
                        <span>{{ item.good }}</span>
                        <v-icon size="12px" color="rgba(255, 255, 255, 0.5)">
                          mdi mdi-cursor-pointer
                        </v-icon>
                        <span class="subheading">45</span>
                      </v-card-actions>
                    </v-row>
                  </div>
                </div>
              </v-list-item>
            </template>
          </v-data-iterator>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
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

.itemPadding {
  padding-top: 8px;
  padding-bottom: 10px;
  padding-left: 8px;
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
