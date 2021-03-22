<template>
  <v-app>
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
    <v-app-bar :clipped-left="clipped" fixed app color="appbar" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-switch v-model="$vuetify.theme.dark" primary label="Dark"></v-switch>
      <v-spacer />
      <router-link to="/">
        <v-toolbar-title v-text="title" />
      </router-link>
      <v-spacer />
      <v-btn icon @click.stop="soundPlay">
        <v-icon>mdi-music-clef-treble</v-icon>
      </v-btn>
      <audio id="HamuAudio" src="/assets/sounds/flowerfairyfly.mp3" loop>
        あなたのブラウザーは古いからよ
      </audio>
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

    <v-footer :absolute="!fixed" app>
      <span>isLogin: {{ isLogin }}</span>

      <v-spacer />
      <span>クッキーの数: {{ count }} </span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase'
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
          icon: 'mdi-movie-open',
          title: 'Scene',
          to: '/scene',
        },
        {
          icon: 'mdi-magnify',
          title: 'Search',
          to: '/search',
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
  computed: mapState(['count', 'isLogin']),
  mounted() {
    this.$store.dispatch('getUserData')
  },
  methods: {
    soundPlay: function ring() {
      document.getElementById('HamuAudio').play()
    },
    googleLogin() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    },
    registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    },
  },
}
</script>
