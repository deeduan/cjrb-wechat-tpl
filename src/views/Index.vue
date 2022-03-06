<template>
    <div class="container">
        <PublicHeader></PublicHeader>

        <div class="list-container">
          <div class="u-search">
            <van-search
                v-model="value"
                show-action
                :placeholder=noteMsg
                @search="onSearch"
            >
              <template #action>
                <div @click="onSearch" class="u-search-tag">搜索</div>
              </template>
            </van-search>
          </div>

          <van-grid :column-num="2" :gutter="14" :border="false">
            <van-grid-item v-for="value in 7" :key="value">
              <img v-lazy="default_goods_img" alt="" class="item-image">
              <div class="grid-item-bottom">
                <div class="grid-item-bottom-info">
                  <div>张三</div>
                  <div>1999票</div>
                </div>
                <div class="grid-item-bottom-button" @click="onVote">
                  投票
                </div>
              </div>
            </van-grid-item>
          </van-grid>
<!--          <VoteCard></VoteCard>-->
        </div>

      <BottomNav></BottomNav>
    </div>
</template>

<script>
    import PublicHeader from "@/components/PublicHeader";
    import BottomNav from "@/components/BottomNav";
    import VoteCard from "@/components/VoteCard";
    import default_goods_img from "@/assets/rw.jpeg";

    import {tLogin} from "@/api/test";

    export default {
        name: "Index",
        data() {
          return {
            value: '',
            noteMsg:'请输入搜索关键字',
            default_goods_img: default_goods_img
          };
        },
        components: {
          PublicHeader,
          VoteCard,
          BottomNav
        },
        created: function () {
            this.init();
            console.log(this.$store.state.openId);
        },
        methods: {
            init: function () {
                let that = this;
                tLogin({user_name:'段正淳'}).then(function (response) {
                    console.log(response);
                    return false;
                });
            },
            onSearch() {
              if (this.value.length < 1) {
                this.$toast('请输入搜索关键字');
                return;
              }
              this.$toast(this.value);
            },
            onVote() {
              // 跳转到个人页面
              this.$router.push({
                path: "/vote"
              });
            }
        }
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    position: relative;
    padding-bottom: 100px;
  }

  .u-search{
    width: 560px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .u-search-tag{
    background-color: #1B4B85;
    color: white;
    width: 100px;
  }

  .van-search__action{
    padding: 0px 0px 0px 0px !important;
  }

  .grid-item-bottom{
    width: 100%;
    border-radius: 0px 0px 6px 6px !important;
  }

  .grid-item-bottom-info{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 8px;
  }

  .grid-item-bottom-info div{
    display: inline-block;
  }

  .item-image{
    max-width: 100%;
    border-radius: 6px 6px 0px 0px !important;
  }

  .grid-item-bottom-button{
    background-color: #1B4B85;
    color: white;
    height: 60px;
    line-height: 60px;
    border-radius: 0px 0px 6px 6px !important;
  }

</style>
