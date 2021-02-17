<template>
  <v-app id="inspire">
    <marquee>とりあえずテーブルでランキング作るからよ</marquee>
    <v-data-iterator :items="chatsValues" item-key="name">
      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.nickName"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card color="#385F73" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline">
                    <h4>{{ item.chat }}</h4>
                  </v-card-title>
                  <v-card-subtitle v-text="item.nickName"></v-card-subtitle>
                  <v-card-subtitle>いいね数：{{ item.good }}</v-card-subtitle>
                  <v-card-subtitle v-text="item.time"></v-card-subtitle>
                </div>
                <v-avatar class="ma-3" size="100" tile>
                  <v-img src="/hamu.jpg"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <!-- <v-data-table
      dense
      :headers="headers"
      :items="chatsValues"
      :items-per-page="50"
      :sort-by="['good']"
      multi-sort
      :sort-desc="[true, false]"
      item-key="name"
      class="elevation-1"
    >
    </v-data-table> -->
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  data() {
    return {
      chatsRemoteData: {},
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
}
</script>
