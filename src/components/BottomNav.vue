<template>
    <div class="bottom-nav-container">
      <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o" @click="onClick()">首页</van-tabbar-item>
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
    onClick(index) {
        if (this.active !== 0) {
          return false;
        }
        // 不单独做搜索页面展示了，一旦切换到主页，刷新一下页面粗暴的坚决方式
        // this.$router.go(0);
    },
    onChange(index) {

      let indexSet = new Set([0,1,2]);

      if (indexSet.has(index) === false) {
        index = 0;
      }

      this.$store.commit('setBottomActive', index);
      switch (index){
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
