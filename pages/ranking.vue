<template>
  <v-app>
    <v-row class="fill-height">
      <v-col cols="12" sm="6" md="4" lg="3" xl="2">
        <v-card color="chat" width="375px">
          <v-data-iterator
            :items="chatsValues"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
          >
            <template #default="{ items }">
              <v-list-item v-for="(item, index) in items" :key="item.key">
                <div>
                  <v-app-bar flat color="rgba(0, 0, 0, 0)">
                    <v-avatar size="40px">
                      <v-img src="/hamu.jpg"></v-img>
                    </v-avatar>
                    <v-spacer></v-spacer>
                    <v-btn color="white" icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-app-bar>
                  <v-card-text>
                    <v-card-sub-title>
                      <p>{{ item.chat }}</p>
                      {{ index + 1 }}{{ item.nickName }} いいね数：{{
                        item.good
                      }}
                      {{ item.time }}
                    </v-card-sub-title>
                    <div class="font-weight-normal">
                      吾輩わがはいは猫である。名前はまだ無い。
                      どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-list-item>
            </template>
          </v-data-iterator>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  data() {
    return {
      chatsRemoteData: {},
      sortBy: 'good',
      sortDesc: true,
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
