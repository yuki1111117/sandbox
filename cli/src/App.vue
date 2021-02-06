<template>
  <v-app>
    <!-- LeftNavBar -->
    <v-navigation-drawer app v-model="drawer"
      >Navigation Lists</v-navigation-drawer
    >

    <!-- HeadNavBar -->
    <v-app-bar
      app
      hide-on-scroll
      dark
      src="https://picsum.photos/id/10/1920/1080"
      fade-img-on-scroll
    >
      <!-- BarColor -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.8)"
        ></v-img>
      </template>
      <!-- BarContent -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>はむのハウスだからよ</v-toolbar-title>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/yuki1111117/sandbox" target="_blank" text>
        <span class="mr-2">Githubだからよ</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- MainContent -->
    <v-main>
      <HelloWorld />
      <v-card>
        <v-card-title>
          <h1 class="display-1">ログイン</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="ユーザ名" />
            <v-text-field label="パスワード" />
          </v-form>
        </v-card-text>
      </v-card>
    </v-main>

    <v-system-bar dark>
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld"; export default { name: "App",
components: { HelloWorld }, data() { return { drawer: null }; } };
</script>
