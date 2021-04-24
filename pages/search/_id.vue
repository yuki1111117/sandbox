<template>
  <v-app>
    <h1>{{ urlId }}</h1>
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
      <p>model:{{ model }}</p>
      <p>urlId:{{ urlId }}</p>
      <p>urlQ:{{ urlQ }}</p>
    </v-container>
    urlId Ranking
    <SearchRanking :nestKey="urlId"></SearchRanking>
    urlQ Ranking
    <SearchRanking :nestKey="'vue%2Ejs'"></SearchRanking>
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
      // combobox
      model: [],
      engine: 'https://duckduckgo.com/',
      items: [],
      // combobox END
    }
  },

  computed: {
    urlId() {
      const value = this.$route.params.id.replace(/\./g, '%2E')
      return value
    },
    urlQ() {
      const value = this.getParam('q').replace(/\./g, '%2E')
      return value
    },
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
    /* eslint-disable */
    /**
     * Get the URL parameter value
     *
     * @param  name {string} パラメータのキー文字列
     * @return  url {url} 対象のURL文字列（任意）
     */
    getParam(name, url) {
      if (!url) url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    },
    /* eslint-enable */
  },
}
</script>
