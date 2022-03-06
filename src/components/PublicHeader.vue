<template>
  <div class="header-container">
    <img src="@/assets/header.jpeg" alt="" class="header-banner">
    <div class="count-down-container">
      <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
    </div>
  </div>
</template>

<script>
export default {
    name: "PublicHeader",
    computed: {
      time: {
        get: function() {
          return this.$store.state.activeTime;
        },
        set: function(active) {}
      }
    },
    data() {
      return {
        // time: 30 * 60 * 60 * 1000,
        // time: 1273554000,
      };
    },
}
</script>

<style scoped>
  .header-container{
    width: 100%;
    position: relative;
  }

  .header-banner{
    max-width: 100%;
  }

  .count-down-container{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

</style>
