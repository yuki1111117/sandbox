<template>
  <v-app id="inspire">
    <marquee>とりあえずテーブルでランキング作るからよ</marquee>

    <v-data-iterator :items="chatsValues" item-key="name">
      <template #default="{ items }">
        <v-container fluid class="full-height">
          <v-row class="fill-height">
            <v-col
              v-for="(item, index) in items"
              :key="item.key"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <v-badge
                avator
                overlap
                color="rgba(0,0,0,0)"
                offset-x="40px"
                offset-y="5px"
              >
                <template #badge>
                  <v-avatar size="40px">
                    <v-img src="/hamu.jpg"></v-img>
                  </v-avatar>
                </template>
                <v-card max-width="325px" color="chat">
                  <v-img
                    height="50px"
                    bottom-gradient
                    src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                    max-width="200px"
                  />
                  <h3>{{ item.chat }}</h3>
                  <h5>
                    {{ index + 1 }}{{ item.nickName }} いいね数：{{ item.good }}
                    {{ item.time }}
                  </h5>
                  <v-card-text>
                    <div class="font-weight-normal">
                      吾輩わがはいは猫である。名前はまだ無い。
                      どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
                    </div>
                  </v-card-text>
                </v-card>
              </v-badge>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-iterator>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  data() {
    return {
      chatsRemoteData: {},
      headers: [
        { text: 'Chat', value: 'chat' },
        { text: 'NickName', value: 'nickName' },
        { text: 'Good', value: 'good' },
        { text: 'Time', value: 'time' },
      ],
    }
  },
  computed: {
    chatsValues() {
      return Object.values(this.chatsRemoteData)
    },
    chatsKeys() {
      return Object.keys(this.chatsRemoteData)
    },
    chatsValuesWithKeys() {
      this.chatsValues.map(
        (value, index) => (value.key = this.chatsKeys[index])
      )
      return this.chatsValues
    },
  },
  mounted() {
    firebase
      .database()
      .ref('chats')
      .on('value', (snapshot) => (this.chatsRemoteData = snapshot.val()))
  },
}
</script>
