<template>
  <v-app>
    <h1>{{ this.$route.params.id }}</h1>
    <SearchCard :item="remoteData"></SearchCard>
    <v-container fluid>
      <v-btn color="primary" @click="jump"> search </v-btn>
      <v-combobox
        v-model="model"
        :items="items"
        hide-selected
        label="Add some tags"
        multiple
        small-chips
      >
      </v-combobox>
      {{ model }}
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import SearchCard from '~/components/SearchCard.vue'

export default {
  components: {
    SearchCard,
  },
  asyncData() {
    return {
      remoteData: {},
    }
  },
  data() {
    return {
      urlId: this.$route.params.id,
      // combobox
      model: [],
      engine: 'https://duckduckgo.com/',
      items: [],
      // combobox END
    }
  },
  mounted() {
    if (this.urlId) {
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
  },

  updated() {
    this.remoteData.key = this.urlId
  },

  methods: {
    jump() {
      if (this.model === []) {
        return
      }
      // creat url
      const head = 'q='
      let q = ''
      let url = ''
      this.model.forEach((e) => {
        q = q.concat(e).concat('+')
      })
      q = q.slice(0, -1)
      url = head.concat(q)
      const link = this.engine.concat('?').concat(url)
      // create url END
      const cardKey = firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .child('then')
        .push().key
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .child('then')
        .child(q)
        .set({
          keyword: q,
          key: cardKey,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        })
      location.assign(link)
    },
  },
}
</script>
