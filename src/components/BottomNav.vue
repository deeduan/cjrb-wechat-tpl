<template>
    <div class="bottom-nav-container">
      <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="bar-chart-o">排行榜</van-tabbar-item>
        <van-tabbar-item icon="comment-o">活动介绍</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
export default {
  name: "BottomNav",
  data() {
    return {
      // active: 0,
    };
  },
  computed: {
    active: {
      get: function() {
        return this.$store.state.bottomActive;
      },
      set: function(active) {}
    }
  },
  methods: {
    onChange(index) {
      this.$store.commit('setBottomActive', index);
      switch (index){
        // case 0:
        //   this.$router.replace({
        //     path: "/"
        //   });
        //   break;
        case 1:
          this.$router.replace({
            path: "/range"
          });
          break;
        case 2:
          this.$router.replace({
            path: "/introduce"
          });
          break;
        default:
          index = 0;
          this.$router.replace({
            path: "/"
          });
          break;
      }
    },
  },
}
</script>

<style scoped lang="less">

</style>
