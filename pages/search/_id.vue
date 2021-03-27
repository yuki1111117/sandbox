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
    <SearchRanking :nestKey="urlId"></SearchRanking>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import SearchCard from '~/components/SearchCard.vue'
import SearchRanking from '~/components/SearchRanking.vue'

export default {
  components: {
    SearchCard,
    SearchRanking,
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
    // For Error: Reference.child failed
    if (this.urlId.match(/\./)) {
      this.urlId = this.urlId.replace(/\./g, '%2E')
    }
    // For Error: Reference.child failed END
    if (this.urlId) {
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .on('value', (snapshot) => (this.remoteData = snapshot.val()))
    }
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
      firebase
        .database()
        .ref('search')
        .child(this.urlId)
        .child('thenData')
        .child(q)
        .set({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          key: q,
        })
      location.assign(link)
    },
  },
}
</script>
