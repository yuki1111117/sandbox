<template lang="">
  <div>
    はむカウンター
    <p>
      カウント:{{ count }} <button v-on:click="countUp">Up</button
      ><button v-on:click="countDown">Down</button>
    </p>
  </div>
</template>
<script>
export default {
  name: "TestCounter",
  data: function() {
    return {
      count: 0
    };
  },
  methods: {
    countUp: function() {
      this.count++;
    },
    countDown: function() {
      this.count--;
    }
  }
};
</script>
<style lang=""></style>
