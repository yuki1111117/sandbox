<template>
  <v-app dark>
    <marquee>ログインのテストだからよ・・・ログインしてくれよな</marquee>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <hamu-logo />
        </div>
        <Login v-if="!isLogin"></Login>
        <UserSetting v-if="isLogin"></UserSetting>
        <v-switch v-model="$vuetify.theme.dark" primary label="Dark"></v-switch>
        <h2>クッキーの枚数: {{ count }}</h2>
        <h2>isLogin: {{ isLogin }}</h2>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import HamuLogo from '~/components/HamuLogo.vue'
import Login from '~/components/Login.vue'
import UserSetting from '~/components/UserSetting.vue'
export default {
  components: {
    HamuLogo,
    Login,
    UserSetting,
  },
  computed: {
    ...mapState(['count', 'isLogin', 'userData']),
  },
  mounted() {
    this.$store.dispatch('getUserData')
  },
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
