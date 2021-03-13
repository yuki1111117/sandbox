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
      <v-btn @click="addSetting('settingObj')"> SAVE </v-btn>
      {{ settingObj }}
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
      <v-btn>SAVE</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
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
      now: '',
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
  methods: {
    addSetting(fieldName) {
      const time = new Date()
      this.now =
        time.getFullYear() +
        '-' +
        time.getMonth() +
        '-' +
        time.getDate() +
        ' ' +
        time.getHours() +
        ':' +
        time.getMinutes() +
        ':' +
        time.getSeconds()
      const cardKey = firebase.database().ref('setting').push().key
      firebase
        .database()
        .ref('setting')
        .child(cardKey)
        .set({
          key: cardKey,
          title: this[fieldName].title,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          time: this.now,
          value: 0,
          usage: { count: 0 },
          parentSetting: { key: '', usage: { count: 0 } },
          childSetting: { key: '', usage: { count: 0 } },
        })
    },
  },
}
</script>
