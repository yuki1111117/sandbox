<template>
  <v-app>
    <v-container fluid>
      <v-combobox
        v-model="model"
        :items="items"
        :search-input.sync="search"
        hide-selected
        hint="Maximum of 5 tags"
        label="Add some tags"
        multiple
        persistent-hint
        small-chips
      >
        <template #no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                No results matching "<strong>{{ search }}</strong> ". Press
                <kbd>enter</kbd> to create a new one
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
    </v-container>
    <v-spacer></v-spacer>
    <v-btn
      :disabled="!selected.length"
      :loading="loading"
      color="purple"
      text
      @click="next"
    >
      Next
    </v-btn>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      select: ['Vuetify', 'Programming'],
      items: ['Programming', 'Design', 'Vue', 'Vuetify'],
      loading: false,
      search: '',
      selected: [],
    }
  },
}
</script>
