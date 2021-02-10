<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">ありのままでいこうや</v-card-title>
        <v-card-text>
          <p>はむだからよ</p>
          <p>はむちんだからよ</p>
          <p>はむさのハウスだからよ</p>
          <p>作りたてだからよ 勘弁してくれよな</p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <table border="0" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td
            id="cars"
            height="50"
            background="/assets/img/xmas_496.gif"
            valign="bottom"
          >
            <marquee
              ><img
                src="assets/img/xmas_480.gif"
                width="21"
                height="26"
                border="0"
                hspace="20"
                class="car" /><img
                src="assets/img/xmas_488.gif"
                width="25"
                height="23"
                border="0"
                hspace="20"
                class="car" /><img
                src="assets/img/xmas_491.gif"
                width="20"
                height="24"
                border="0"
                hspace="20"
                class="car" /><img
                src="assets/img/xmas_490.gif"
                width="18"
                height="24"
                border="0"
                hspace="20"
                class="car"
            /></marquee>
          </td>
        </tr>
      </tbody>
    </table>
  </v-row>
</template>

<style scoped>
#cars {
  background-repeat: repeat;
}
.car {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 20px;
}
</style>
<script>
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    VuetifyLogo,
  },
}
</script>
