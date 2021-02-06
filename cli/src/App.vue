<template>
  <v-app>
    <!-- LeftNavBar -->
    <v-navigation-drawer app v-model="drawer" clipped
      >Navigation Lists</v-navigation-drawer
    >

    <!-- HeadNavBar -->
    <v-app-bar
      app
      hide-on-scroll
      dark
      src="https://picsum.photos/id/10/1920/1080"
      fade-img-on-scroll
      clipped-left
    >
      <!-- BarColor -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.8)"
        ></v-img>
      </template>
      <!-- BarContent -->
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="18"
        />
      </div>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>はむのハウスだからよ</v-toolbar-title>

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

    <v-footer absolute app dark>
      <v-col class="" cols="12">
        {{ new Date().getFullYear() }} — <strong>はむのハウス</strong>
      </v-col></v-footer
    >
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld"; export default { name: "App",
components: { HelloWorld }, data() { return { drawer: null }; } };
</script>
