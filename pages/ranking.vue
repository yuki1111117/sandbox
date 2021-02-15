<template>
  <v-app id="inspire">
    <marquee>とりあえずテーブルでランキング作るからよ</marquee>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="chatsValues"
      :sort-by="['calories', 'fat']"
      :sort-desc="[false, true]"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
    >
      <template #top>
        <v-switch
          v-model="singleSelect"
          label="Single select"
          class="pa-3"
        ></v-switch>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
      chatsRemoteData: {},
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Chat', value: 'chat' },
        { text: 'NickName', value: 'nickName' },
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
