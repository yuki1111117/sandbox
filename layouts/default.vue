<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="soundPlay">
        <v-icon>mdi-music-clef-treble</v-icon>
      </v-btn>
      <audio id="HamuAudio" src="/assets/sounds/flowerfairyfly.mp3" loop>
        あなたのブラウザーは古いからよ
      </audio>
      <router-link to="/sandbox">
        <v-btn icon>
          <v-icon>mdi-test-tube</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} はむさのハウス</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: null,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-crown',
          title: 'Ranking',
          to: '/ranking',
        },
        {
          icon: 'mdi-test-tube',
          title: 'Sandbox',
          to: '/sandbox',
        },
        {
          icon: 'mdi-chat-processing',
          title: 'Chatroom',
          to: '/chatroom',
        },
        {
          icon: 'mdi-human',
          title: 'Users',
          to: '/users/list',
        },
        {
          icon: 'mdi-notebook-outline',
          title: 'Category',
          to: '/category/index',
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Posts',
          to: '/posts',
        },
        {
          icon: 'mdi-ninja',
          title: 'CloneSites',
          to: '/clonesites',
        },
        {
          icon: 'mdi-cookie',
          title: 'Counter',
          to: '/counter',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: null,
      title: 'はむちんのハウス',
    }
  },
  methods: {
    soundPlay: function ring() {
      document.getElementById('HamuAudio').play()
    },
  },
}
</script>
