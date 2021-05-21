<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      src="/assets/img/skylarJean.jpg"
    >
      <v-list dense nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-group :value="true" prepend-icon="mdi-magnify">
          <template #activator>
            <v-list-item-title>Search</v-list-item-title>
          </template>
          <v-list-item
            v-for="(item, i) in searchItems"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="appbar" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <router-link to="/">
        <v-toolbar-title v-text="title" />
      </router-link>
      <v-spacer />
      <router-link to="/account">
        <v-btn icon>
          <v-avatar size="36">
            <img src="/hamu.jpg" alt="hamutin" />
          </v-avatar>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" padless>
      <span>isLogin: {{ isLogin }}</span>

      <v-spacer />
      <v-switch v-model="$vuetify.theme.dark" primary label="Dark"></v-switch>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      clipped: true,
      drawer: null,
      fixed: false,
      email: '',
      password: '',
      items: [
        {
          icon: 'mdi-crown',
          title: 'Ranking',
          to: '/ranking',
        },
        {
          icon: 'mdi-egg-easter',
          title: 'Setting',
          to: '/setting',
        },

        {
          icon: 'mdi-chat-processing',
          title: 'Chatroom',
          to: '/chatroom',
        },
        {
          icon: 'mdi-magnify',
          title: 'Search',
          to: '/search',
        },
      ],
      searchItems: [
        {
          icon: 'mdi-magnify',
          title: 'vuejs',
          to: '/search/vuejs',
        },
        {
          icon: 'mdi-magnify',
          title: 'css',
          to: '/search/css',
        },
      ],
      right: true,
      rightDrawer: null,
      title: 'はむちんのハウス',
    }
  },
  computed: mapState(['isLogin']),
  mounted() {
    this.$store.dispatch('getUserData')
  },
}
</script>
