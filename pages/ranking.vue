<template>
  <v-app id="inspire">
    <marquee>とりあえずテーブルでランキング作るからよ</marquee>

    <v-data-iterator :items="chatsValues" item-key="name">
      <template #default="{ items }">
        <v-container fluid class="full-height">
          <v-row class="fill-height">
            <v-col
              v-for="item in items"
              :key="item.nickName"
              cols="12"
              sm="10"
              md="8"
              lg="6"
              xl="4"
            >
              <v-badge
                avator
                overlap
                color="rgba(0,0,0,0)"
                offset-x="40px"
                offset-y="-1px"
              >
                <template #badge>
                  <v-avatar size="40px" rounded>
                    <v-img src="/hamu.jpg"></v-img>
                  </v-avatar>
                </template>
                <v-list three-line dark color="#1C1C1C7">
                  <h3>{{ item.chat }}</h3>
                  <h5>
                    {{ item.nickName }} いいね数：{{ item.good }}
                    {{ item.time }}
                  </h5>
                  <h4>
                    Small plates, salads & sandwiches - an intimate setting with
                    12 indoor seats plus patio seating.
                  </h4>
                </v-list>
              </v-badge>
            </v-col>
          </v-row>
        </v-container>
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
