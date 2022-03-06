<template>
  <div class="vote-container">

    <div class="return" @click="returnHome">
      返回
    </div>

    <PublicHeader></PublicHeader>

    <div class="join-window">
      <img v-lazy="default_goods_img" alt="" class="item-image">
    </div>

    <div class="base-info">
      <div class="u-name">
        张老三
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
          <van-cell title="善作为" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="有作为" clickable @click="radio = '2'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <van-cell title="慢作为" clickable @click="radio = '3'">
            <template #right-icon>
              <van-radio name="3" />
            </template>
          </van-cell>
          <van-cell title="不作为" clickable @click="radio = '4'">
            <template #right-icon>
              <van-radio name="4" />
            </template>
          </van-cell>
          <van-cell title="乱作为" clickable @click="radio = '5'">
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
      <van-button type="primary" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>

import PublicHeader from "@/components/PublicHeader";
import default_goods_img from "@/assets/rw.jpeg";
import {tLogin} from "@/api/test";

export default {
    name: "Vote",
    components: {
      PublicHeader,
    },
    data() {
      return {
        default_goods_img: default_goods_img,
        sms:'',
        tel:'',
        message:'',
        radio:0
      };
    },
    methods: {
      returnHome() {
        this.$router.replace({
          path: "/"
        });
      },
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
