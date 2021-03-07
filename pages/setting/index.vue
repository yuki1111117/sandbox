<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="2" xl="3">
      <v-text-field v-model="settingObj.title" label="Title"></v-text-field>
      <v-text-field v-model="settingObj.sortBy" label="SortBy"></v-text-field>
      <v-text-field
        v-model="settingObj.page"
        label="ItemPerPage"
        type="Number"
      ></v-text-field>
    </v-col>
    <ChatRanking
      :title="settingObj.title"
      :sortBy="settingObj.sortBy"
      :itemPerPage="itemPerPage"
    ></ChatRanking>
    <ChatRanking
      :title="compareObj.title"
      :sortBy="compareObj.sortBy"
      :itemPerPage="comparePerPage"
    ></ChatRanking>
    <v-col cols="12" sm="12" md="12" lg="2" xl="3">
      <v-text-field v-model="compareObj.title" label="Title"></v-text-field>
      <v-text-field v-model="compareObj.sortBy" label="SortBy"></v-text-field>
      <v-text-field
        v-model="compareObj.page"
        label="ItemPerPage"
        type="Number"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import ChatRanking from '~/components/chatRanking.vue'
export default {
  components: {
    ChatRanking,
  },
  data() {
    return {
      settingObj: {
        title: 'SettingTitle',
        sortBy: 'good',
        page: 3,
      },
      compareObj: {
        title: 'CompareTitle',
        sortBy: 'time',
        page: 2,
      },
    }
  },
  computed: {
    itemPerPage() {
      return Number(this.settingObj.page)
    },
    comparePerPage() {
      return Number(this.compareObj.page)
    },
  },
}
</script>
