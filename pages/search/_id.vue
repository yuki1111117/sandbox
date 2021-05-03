<template>
  <v-app>
    <v-img src="/assets/img/tamara-malaniy.jpg" max-height="30vh"></v-img>
    <SearchCard :item="remoteData"></SearchCard>
    <v-card>
      <v-btn color="primary" @click="addKeyword"> ADD </v-btn>
      <v-combobox
        v-model="model"
        :items="items"
        hide-selected
        label="検索するキーワードを入れてください"
        multiple
        small-chips
      >
      </v-combobox>
    </v-card>
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
    addKeyword() {
      if (this.model === []) {
        return
      }
      // creat url
      let q = ''
      this.model.forEach((e) => {
        q = q.concat(e).concat('+')
      })
      q = q.slice(0, -1)
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
