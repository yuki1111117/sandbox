<template>
  <v-app>
    <v-container fluid>
      <v-btn @click="jump">search</v-btn>
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
export default {
  data() {
    return {
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      model: [],
      engine: 'https://duckduckgo.com/',
    }
  },
  computed: {
    query() {
      const queryStr = window.location.search.slice(1) // 文頭?を除外
      const queries = {}
      let q = ''
      if (!queryStr) {
        return queries
      }
      queryStr.split('&').forEach(function (queryStr) {
        const queryArr = queryStr.split('=')
        queryArr[1].split('%20').forEach(function (e) {
          q = q.concat(e).concat(' ')
        })
        q = q.slice(0, -1)
        queries[queryArr[0]] = q
      })
      const link = this.engine.concat('?').concat('q=').concat(queries.q)
      location.assign(link)
      return queries
    },
  },
  methods: {
    jump() {
      let q = 'q='
      this.model.forEach((e) => {
        q = q.concat(e).concat('+')
      })
      q = q.slice(0, -1)
      const link = this.engine.concat('?').concat(q)
      location.assign(link)
    },
  },
}
</script>
