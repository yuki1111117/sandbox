<template>
  <v-app>
    <!-- LeftNavBar -->
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">
              はむのリストだからよ
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name">
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>

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
      <v-toolbar-items>
        <v-btn text>File</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>Edit</v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Consulting and support</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Discord community</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>Help</v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Githubだからよ 見ててってくれよな</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >作りたてだからよ 勘弁してくれよな</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-title>はむのハウスだからよ</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/yuki1111117/sandbox" target="_blank" text>
        <span class="mr-2">Githubだからよ</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- MainContent -->
    <v-main>
      <v-system-bar>
        <!-- BarContent -->
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-system-bar>

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
        {{ new Date().getFullYear() }} — <strong>はむさのハウス</strong>
      </v-col></v-footer
    >
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld"; export default { name: "App",
components: { HelloWorld }, data() { return { drawer: null, nav_lists: [ { name:
"Getting Started", icon: "mdi-vuetify" }, { name: "ユーザー設定", icon:
"mdi-cogs" }, { name: "Styles & animations", icon: "mdi-palette" }, { name:
"UIComponents", icon: "mdi-view-dashboard" }, { name: "Directives", icon:
"mdi-function" }, { name: "Preminum themes", icon: "mdi-vuetify" } ] }; } };
</script>
