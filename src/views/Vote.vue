<template>
  <div class="vote-container">

    <div class="return" @click="returnHome">
      返回
    </div>

    <PublicHeader></PublicHeader>

    <div v-if="user.err === 1">
        暂无候选人,请返回重新选择。
    </div>
    <div v-else>
      <div class="join-window">
        <img v-lazy="default_goods_img" alt="" class="item-image">
      </div>

      <div class="base-info">
        <div class="u-name">
          {{user.name}}
        </div>
        <div class="u-unit">
          单位及职务：测试局党委副书记、副局长
        </div>
      </div>

      <div class="vote-info-3">
        <div class="vote-info-ruler-notice">
          选项说明
        </div>
        <div class="vote-info-ruler-item">
          善作为: 这是一段测试善作为的话假的;
        </div>
        <div class="vote-info-ruler-item">
          有作为: 这是一段测试善作为的话假的;
        </div>
        <div class="vote-info-ruler-item">
          慢作为: 这是一段测试善作为的话假的;
        </div>
        <div class="vote-info-ruler-item">
          不作为: 这是一段测试善作为的话假的;
        </div>
        <div class="vote-info-ruler-item">
          乱作为: 这是一段测试善作为的话假的;
        </div>
      </div>


      <div class="vote-field">

        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell clickable @click="radio = '1'">
              <template #title>
                <span class="custom-title">善作为</span>
                <span>({{user.t_szw}}票)</span>
              </template>
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell clickable @click="radio = '2'">
              <template #title>
                <span class="custom-title">有作为</span>
                <span>({{user.t_yzw}}票)</span>
              </template>
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell clickable @click="radio = '3'">
              <template #title>
                <span class="custom-title">慢作为</span>
                <span>({{user.t_mzw}}票)</span>
              </template>
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
            <van-cell clickable @click="radio = '4'">
              <template #title>
                <span class="custom-title">不作为</span>
                <span>({{user.t_bzw}}票)</span>
              </template>
              <template #right-icon>
                <van-radio name="4" />
              </template>
            </van-cell>
            <van-cell clickable @click="radio = '5'">
              <template #title>
                <span class="custom-title">乱作为</span>
                <span>({{user.t_lzw}}票)</span>
              </template>
              <template #right-icon>
                <van-radio name="5" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

        <van-field v-model="tel" type="tel" label="手机号" />

        <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>

        <van-field
            v-model="message"
            rows="1"
            autosize
            label="事由"
            type="textarea"
            placeholder="具体事由"
        />

      </div>

      <div class="vote-submit">
        <van-button type="primary" size="large" @click="submitVote">提交</van-button>
      </div>
    </div>


  </div>
</template>

<script>

import PublicHeader from "@/components/PublicHeader";
import default_goods_img from "@/assets/rw.jpeg";
import {tLogin} from "@/api/test";
import {search, vote} from "@/api";

export default {
    name: "Vote",
    components: {
      PublicHeader,
    },
    created: function () {
      // @todo 改成用Id去搜索的形式
      if (this.$route.params.hasOwnProperty('user')) {
        this.user = this.$route.params.user;
      }
    },
    data() {
      return {
        default_goods_img: default_goods_img,
        sms:'',
        tel:'',
        message:'',
        radio:0,
        user: {
          'err':1
        },
        hasBeenVote:0
      };
    },
    methods: {
      returnHome() {
        this.$router.replace({
          path: "/"
        });
      },
      submitVote() {

        if (this.$store.state.activeTime <= 0)  {
          this.$toast('活动已结束~');
          return false;
        }

        if (this.hasBeenVote === 1) {
          this.$toast('您今天已经投过票了，明天再来吧~');
          return;
        }

        let that = this;

        // 参数检查也在这里做了算了
        let zw = that.radio;
        let tel = that.tel;
        let message = that.message;
        let sms = that.sms;

        if (zw.length === 0 || zw === 0) {
          that.$toast('投票类型请重新选择~');
          return;
        }

        if(!(/^1[3456789]\d{9}$/.test(tel))){
          that.$toast('手机号格式不正确~');
          return false;
        }

        if (sms.length === 0) {
          that.$toast('请填写短信验证码~');
          return;
        }

        if (message.length === 0) {
          that.$toast('请填写具体事由~');
          return;
        }

        let requestData = {
          id: that.user.id,
          zw: that.radio,
          tel: that.tel,
          message: that.message,
          sms: that.sms,
        };

        vote(requestData).then(function (response) {
          let data = response.data.data;

          if (data.success !== true) {
            that.$toast('网络正忙,请稍后再试~');
            return false;
          }

          // @todo 后端判断是否已经投过了

          that.hasBeenVote = 1;

          that.$toast('投票成功!');

          setTimeout(() => {
            that.$router.replace({
              path: "/"
            });
          }, 2000);

          return false;
        }).catch(e => {
          console.log(e);
          that.$toast('网络繁忙，请稍后再试');
        })

      }
    }
}
</script>

<style scoped lang="less">
  .vote-container{
    position: relative;
    width: 750px;
    background-color: #FBF6F9;
  }

  .join-window{
    padding: 10px;
  }

  img{
    max-width: 100%;
  }

  .base-info{
    color: #225a93;
  }
  .u-name{
    font-weight: bold;
    font-size: 36px;
    color: #225a93;
    height: 40px;
    line-height: 40px;
    padding-top: 40px;
  }

  .u-unit{
    padding-top: 30px;
    margin-bottom: 30px;
    font-size: 28px;
  }


  .vote-info-3{
    line-height: 44px;
    border: 1px solid #225a93;/*no*/
    width: 600px;
    margin: 0 auto;
    border-radius: 4px;
    padding: 10px 0px;
    background-color: white;
  }

  .vote-info-ruler-notice{
    font-weight: bold;
  }

  .vote-field{
    width: 600px;
    margin: 0 auto;
    padding-top: 60px;
  }

  .van-cell__title{
    text-align: left !important;
  }

  .vote-submit{
    width: 600px;
    margin: 0 auto;
    padding: 20px 0px 80px 0px;
  }

  .return{
    position: fixed;
    top: 40px;
    left: 0px;
    z-index: 1000;
    width: 80px;
    height: 40px;
    line-height: 40px;
    border-radius: 0px 6px 6px 0px;
    font-size: 18px;
    background-color: #225a93;
    opacity: 0.8;
    color: white;
  }
</style>
