<template>
  <v-app id="inspire">
    <marquee>とりあえずテーブルでランキング作るからよ</marquee>
    <v-data-iterator :items="chatsValues" item-key="name" hide-default-footer>
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
            <v-card>
              <v-card-title>
                <h4>{{ item.nickName }}</h4>
              </v-card-title>
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
