<template>
  <v-app>
    <v-container fluid>
      <v-btn @click="jump"> search </v-btn>
      <v-combobox
        v-model="model"
        :items="items"
        hide-selected
        label="Add some tags"
        multiple
        small-chips
      >
        <template #no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                No results matching "<strong>{{ search }}</strong
                >". Press <kbd>enter</kbd> to create a new one
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
      {{ model }}
      {{ query }}
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
export default {
  data() {
    return {
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      model: [],
      engine: 'https://duckduckgo.com/',
      symbol: '.', // For Error: Reference.child failed
    }
  },

  mounted() {
    const queryStr = decodeURI(window.location.search.slice(1)) // 文頭?を除外
    if (!queryStr) return
    const queries = {}
    let q = ''
    queryStr.split('&').forEach(function (queryStr) {
      const queryArr = queryStr.split('=')
      queryArr[1].split('%20').forEach(function (e) {
        q = q.concat(e).concat(' ')
      })
      q = q.slice(0, -1)
      queries[queryArr[0]] = q
    })
    // For Error: Reference.child failed
    if (queries.q.match(/\./)) {
      queries.q = queries.q.replace(/\./g, '%2E')
    }

    const link = this.engine.concat('?').concat('q=').concat(queries.q)
    firebase
      .database()
      .ref('title')
      .child(queries.q)
      .update({
        searchKey: { key: queries.q },
      })
      .then(
        firebase
          .database()
          .ref('search')
          .child(queries.q)
          .update({
            title: { key: queries.q },
            keywords: queries.q.split(' '),
          })
          .then(() => location.assign(link))
      )
  },

  methods: {
    jump() {
      if (this.model === []) {
        return
      }
      let q = 'q='
      this.model.forEach((e) => {
        q = q.concat(e).concat('+')
      })
      q = q.slice(0, -1)
      const link = this.engine.concat('?').concat(q)
      const cardKey = firebase.database().ref('search').push().key
      firebase.database().ref('search').child(q).set({
        keyword: q,
        key: cardKey,
      })
      location.assign(link)
    },
  },
}
</script>
