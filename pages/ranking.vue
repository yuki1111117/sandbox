<template>
  <v-app id="inspire">
    <marquee>とりあえずテーブルでランキング作るからよ</marquee>
    <v-data-iterator :items="chatsValues"></v-data-iterator>
    <template #default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              {{ item.name }}
            </v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item-content
                v-for="(key, index) in filteredKeys"
                :key="index"
              >
                <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                  {{ key }}:
                </v-list-item-content>
                <v-list-item-content
                  class="align-end"
                  :class="{ 'blue--text': sortBy === key }"
                >
                  {{ item[key.toLowerCase()] }}
                </v-list-item-content>
              </v-list-item-content>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <v-data-table
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
    </v-data-table>
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
