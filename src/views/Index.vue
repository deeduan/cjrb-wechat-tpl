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

          <div v-if="list.length > 0">
            <van-grid :column-num="2" :gutter="14" :border="false">
              <van-grid-item v-for="user in list" :key="user.id">
                <img v-lazy="user.creatives[0].curl" alt="" class="item-image">
                <div class="grid-item-bottom" @click="onVote(user.id)">
                  <div class="grid-item-bottom-info">
                    <div>{{user.no}}号</div>
                    <div>{{user.name}}</div>
                  </div>
                  <div class="grid-item-bottom-button">
                    投票
                  </div>
                </div>
              </van-grid-item>
            </van-grid>
          </div>
          <div v-else class="no-joiner">
            还没有任何候选窗口哦~
          </div>

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
    import {init as fInit} from "@/api";
    import {search} from "@/api";

    export default {
        name: "Index",
        data() {
          return {
            value: '',
            noteMsg:'请输入窗口编号',
            default_goods_img: default_goods_img,
            list: [],
            c_id:0,
          };
        },
        components: {
          PublicHeader,
          VoteCard,
          BottomNav
        },
        created: function () {
            this.init();
            // console.log(this.$store.state.openId);
        },
        methods: {
            init: function () {

              /**
               * 测试mock 的
               */
              // let that = this;
                // tLogin({user_name:'段正淳'}).then(function (response) {
                //     console.log(response);
                //     return false;
                // });

              let that = this;
              fInit().then(function (response) {
                  let data = response.data;

                if (data.hasOwnProperty('code')) {
                  that.$toast('网络忙，请稍后再试！');
                  return false;
                }

                  if (data.hasOwnProperty('ttl')) {
                    let ttl = data.ttl * 1000;
                    that.$store.commit('setActiveTime', ttl);
                    that.list = data.items;
                    that.$store.commit('setCid', that.list[0].campaign_id);
                  }

                  return false;
              }).catch(e => {
                console.log(e);
                that.$toast('网络繁忙,请稍后再试~');
              });

            },
            onSearch() {
              if (this.value.length < 1) {
                this.$toast('请输入窗口编号');
                return;
              }

              // 检验输入是否为数字
              let pattern = /^\d+$/;
              if (!pattern.test(this.value)) {
                this.$toast('格式不正确，请输入窗口编号！');
                return;
              }

              let that = this;
              let requestData = {
                ci: that.$store.state.c_id,
                kw: that.value
              };

              search(requestData).then(function (response) {

                let data = response.data;
                    
                if (data.hasOwnProperty('code')) {
                  that.$toast('查不到结果，请重新搜索~');
                  return false;
                }

                that.list = data;

                return false;
              }).catch(e => {
                console.log(e);
                that.$toast('网络繁忙,请稍后再试~');
              })
            },
            onVote(id) {
              if (this.$store.state.activeTime <= 0)  {
                this.$toast('活动已结束~');
                return false;
              }

              console.log(id);
              // 跳转到个人页面
              this.$router.push({
                name: "Vote",
                params: {
                  id
                }
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
    background-color: #FBF6F9;
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

  .no-joiner{
    padding-top: 60px;
  }
</style>
