<template>
  <v-card class="cardContainer" color="chatbox">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.name" label="Dessert name">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.calories" label="Calories">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.fat" label="Fat (g)">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.carbs" label="Carbs (g)">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.protein" label="Protein (g)">
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="cardAvator">
      <v-card-text class="cardRankingInfo text--disabled">
        {{ index + 1 }}
      </v-card-text>
      <v-avatar size="40px" rounded="rounded">
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
            @click.stop="dialog = true"
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
          <span class="infoText iconBtn">{{ item.good }}</span>
          <nuxt-link :to="'/chatroom/' + item.key">
            <h6>返信</h6>
          </nuxt-link>
          <span class="infoText">45</span>
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
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }
  },
  methods: {
    deleteMessage(item) {
      firebase.database().ref('chats').child(item.key).remove()
    },
    goodMessage(item) {
      firebase
        .database()
        .ref('chats')
        .child(item.key)
        .update({ good: item.good + 1 })
      this.$emit('from-child', item)
    },
    close() {
      this.dialog = false
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

  /* 以下第０版さんより拝借ものを少し改変
  /* ダークとライトで分けてバックカラーは設定 */

  /* 背景色
  border: 1px solid #ccc

  /* 線の太さ・種類・色
  box-shadow: 1px 1px 6px 0px #ccc
  -moz-box-shadow: 1px 1px 6px 0px #ccc
  -webkit-box-shadow: 1px 1px 6px 0px #ccc
  -o-box-shadow: 1px 1px 6px 0px #ccc
  margin: 10px 5px

  /* 外側の余白 上下・左右
  padding: 30px 20px 20px 20px

  /* 内側の余白 上・右・下・左
  position: relative
  z-index: 0

  &:after
    /* 以下第０版さんより拝借ものを若干変更
    background-color: #dfd4be
    /* マステ部分の色1
    background-image: linear-gradient(45deg, #dfd4be 25%, transparent 25%, transparent 75%, #dfd4be 75%, #dfd4be), linear-gradient(45deg, #dfd4be 25%, transparent 25%, transparent 75%, #dfd4be 75%, #dfd4be)

    /* マステ部分の色2
    background-position: 0 0, 12px 12px
    background-size: 24px 24px
    border-left: 2px dotted rgba(255, 255, 255, 0.9)
    border-right: 2px dotted rgba(255, 255, 255, 0.9)
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5)
    content: 'hamu'
    display: block
    margin: 0 0 10px 0
    padding: 5px 20px
    color: #fff

    /* マステ部分文字色
    text-align: center
    position: absolute
    top: -10px
    left: 20px
    transform: rotate(-3deg)
    -moz-transform: rotate(-3deg)
    -webkit-transform: rotate(-3deg)
    -o-transform: rotate(-3deg)

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
