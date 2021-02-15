<template>
  <v-app id="inspire">
    <marquee>とりあえずテーブルでランキング作るからよ</marquee>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="chats"
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
    <h2>{{ tableData }}</h2>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
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
      chats: [
        {
          name: 'Frozen Yogurt',
          chat: 'chat',
          user: { nickName: 'hamu' },
        },
      ],
      chatsObj: {
        keydayo: {
          name: 'Frozen Yogurt',
          chat: 'chat',
          user: { nickName: 'hamu' },
        },
        hamudayo: {
          name: 'Frozen Yogurt',
          chat: 'chat',
          user: { nickName: 'hamu' },
        },
      },
    }
  },
  computed: {
    tableData() {
      return Object.entries(this.chatsObj)
    },
  },
}
</script>
