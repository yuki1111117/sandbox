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
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'NickName', value: 'nickName' },
      ],
      chats: [
        {
          name: 'Frozen Yogurt',
          chat: 'chat',
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          user: { nickName: 'hamu' },
        },
      ],
    }
  },
}
</script>
