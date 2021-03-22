<template>
  <v-card elevation="0" class="cardContainer" color="background">
    <v-dialog v-model="dialog" max-width="500px">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.nickName" label="NickName">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.good" type="number" label="Good">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.chat" label="Chat">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.time" label="Time">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.key" label="Key"> </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save(item)"> Save </v-btn>
      </v-card-actions>
    </v-dialog>

    <div class="cardAvator">
      <v-card-text class="cardRankingInfo text--disabled">
        {{ index + 1 }}
        <v-checkbox v-model="editedItem.done" @click="check(item)">
        </v-checkbox>
      </v-card-text>
      <v-avatar size="24px">
        <v-img src="/hamu.jpg"></v-img>
      </v-avatar>
    </div>
    <div class="cardText">
      <div class="cardInfoTop d-flex justify-space-between">
        <v-card-text class="cardInfo text--secondary">
          {{ item.nickName }}
        </v-card-text>
        <v-card-text class="cardInfo text--disabled">
          <v-spacer></v-spacer>{{ item.time }}
        </v-card-text>
      </div>
      <v-card-text class="cardTitleText font-weight-normal">
        {{ item.chat }}
      </v-card-text>
      <v-row justify="end">
        <v-card-actions class="text--disabled">
          <v-icon
            class="iconBtn"
            size="12px"
            color="fontcolor"
            @click="editItem(item)"
          >
            mdi mdi-pencil
          </v-icon>
          <v-icon
            class="iconBtn"
            size="12px"
            color="fontcolor"
            @click="deleteMessage(item)"
          >
            mdi mdi-eraser
          </v-icon>
          <v-icon size="12px" color="fontcolor" @click="goodMessage(item)">
            mdi-heart
          </v-icon>
          <span class="infoText iconBtn">{{ item.goodObj.count }}</span>
          <nuxt-link :to="'/chatroom/' + item.key">
            <v-icon size="12px" color="fontcolor"> mdi-message </v-icon>
          </nuxt-link>
          <span class="infoText">99</span>
        </v-card-actions>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'

export default {
  props: {
    item: {
      type: Object,
      required: false,
      default() {
        return {
          chat: '眠いなあ',
          createdAt: 1614603094812,
          good: 1,
          goodObj: { count: 0 },
          key: 'dummyKey',
          nickName: 'はむちん',
          time: '2121-2-1 21:51:35',
        }
      },
    },
    index: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      dialog: false,
      editedItem: {},
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.editedItem = Object.assign({}, this.item)
    },
    deleteMessage(item) {
      firebase.database().ref('chats').child(item.key).remove()
    },
    goodMessage(item) {
      this.editedItem = Object.assign({}, item)
      this.editedItem.goodObj.count = this.editedItem.goodObj.count + 1
      firebase
        .database()
        .ref('chats')
        .child(item.key)
        .child('goodObj')
        .update({ count: Number(this.editedItem.goodObj.count) })
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    check(item) {
      firebase.database().ref('chats').child(item.key).update({
        done: this.editedItem.done,
      })
    },
    close() {
      this.dialog = false
    },
    save(item) {
      firebase
        .database()
        .ref('chats')
        .child(item.key)
        .update({
          chat: this.editedItem.chat,
          createdAt: Number(this.editedItem.createdAt),
          good: Number(this.editedItem.good),
          key: this.editedItem.key,
          nickName: this.editedItem.nickName,
          time: this.editedItem.time,
        })
      this.close()
    },
  },
}
</script>

<style scoped lang="sass">
.infoText
  font-size: 12px

.cardContainer
  display: flex
  width: 100%


.cardAvator
  display: flex
  padding-top: 4px

.cardText
  display: block
  width: 100%

.cardInfo
  display: flex
  font-size: 12px
  padding-top: 0px
  padding-left: 5px
  padding-bottom: 0px
  padding-right: 0px

.cardRankingInfo
  display: flex
  font-size: 12px
  padding-top: 0px
  padding-left: 0px
  padding-bottom: 0px
  padding-right: 5px

.cardInfoTop
  display: flex

.cardTitleText
  font-size: 15px
  letter-spacing: 0.05em
  line-height: 1.3125
  word-break: break-all
  overflow: hidden
  overflow-wrap: break-word
  text-overflow: ellipsis
  padding-left: 5px
  padding-right: 0px
  padding-bottom: 0px
  padding-top: 0px

.iconBtn
  margin-right: 12px
</style>
