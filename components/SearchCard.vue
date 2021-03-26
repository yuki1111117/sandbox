<template>
  <v-card elevation="0" color="background">
    <v-card-text class="cardRankingInfo text--disabled">
      {{ index + 1 }}
    </v-card-text>
    <a :href="searchLink">
      <v-list-item-title class="searchKey">
        {{ item.key }}
      </v-list-item-title>
    </a>
    <div class="cardText">
      <v-card-text class="cardTitleText font-weight-normal">
        {{ item.chat }}
      </v-card-text>
      <v-row justify="start">
        <v-card-actions class="text--disabled searchActions">
          <v-icon class="iconBtn" size="12px" color="fontcolor">
            mdi mdi-pencil
          </v-icon>
          <v-icon class="iconBtn" size="12px" color="fontcolor">
            mdi mdi-eraser
          </v-icon>
          <div class="iconBtn">
            <v-icon size="12px" color="fontcolor"> mdi-heart </v-icon>
            <span class="infoText">-1</span>
          </div>
          <nuxt-link :to="'/search/' + item.key">
            <v-icon size="12px" color="fontcolor"> mdi-message </v-icon>
          </nuxt-link>
          <span class="infoText">-1</span>
        </v-card-actions>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      engine: 'https://duckduckgo.com/',
    }
  },
  computed: {
    searchLink() {
      const link = this.engine + this.item.key
      return link
    },
  },
}
</script>

<style scoped>
.infoText {
  font-size: 12px;
}

.cardContainer {
  display: flex;
  width: 100%;
}

.cardAvator {
  display: flex;
  padding-top: 4px;
}

.cardText {
  display: block;
  width: 100%;
}

.cardInfo {
  display: flex;
  font-size: 12px;
  padding-top: 0px;
  padding-left: 5px;
  padding-bottom: 0px;
  padding-right: 0px;
}

.cardRankingInfo {
  display: flex;
  font-size: 12px;
  padding-top: 0px;
  padding-left: 0px;
  padding-bottom: 0px;
  padding-right: 5px;
}

.cardInfoTop {
  display: flex;
}

.cardTitleText {
  font-size: 15px;
  letter-spacing: 0.05em;
  line-height: 1.3125;
  word-break: break-all;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  padding-left: 5px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.iconBtn {
  margin-right: 12px;
}

.searchActions {
  padding-left: 11px;
}

.searchKey {
  padding-bottom: 5px;
}
</style>
