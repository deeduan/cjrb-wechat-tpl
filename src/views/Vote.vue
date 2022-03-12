<template>
  <div class="vote-container">

    <div class="return" @click="returnHome">
      返回
    </div>

    <PublicHeader></PublicHeader>

    <div v-if="user.err === 1" class="no-user">
        暂无候选人,请点击左上角返回重新选择。
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
          好评数：  {{user.t_hp}},
          差评数：  {{user.t_cp}}
        </div>
      </div>

      <div class="vote-info-3">
        <div class="vote-info-ruler-notice">
          选项说明
        </div>

        <div class="vote-info-ruler-item">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item title="责任落实方面" name="1"><span class="span-ruler-notice">各窗口</span>是否履行行政审批和政务服务主体责任、监管责任情况，是否及时学习传达、研究部署关于推进审批服务便民化、“放管服”改革和“一件事一次办”改革、优化营商环境，以及“清廉大厅”建设工作安排；是否建立健全政务服务大厅全过程监督、问效和考核评价等工作机制；是否结合实际制定措施办法，加强对中介机构的监督管理等。</van-collapse-item>
            <van-collapse-item title="工作作风方面" name="2">窗口工作人员在行政审批和政务服务中是否存在不作为、慢作为、乱作为、假作为等形式主义官僚主义问题，是否存在业务不精、推诿扯皮、态度生硬、服务不优、慵懒散拖等问题；是否存在落实首问责任制、一次性告知制、限时办结制等有关规定不力，让企业群众多头跑、重复跑等问题；是否存在审批事项虚进、假进服务大厅，搞“两头受理”“体外循环”“隐性审批”，致使办事效率低下、群众满意度不高等问题。</van-collapse-item>
            <van-collapse-item title="违纪违法方面" name="3">窗口工作人员在行政审批、政务服务中是否遵纪守法，是否存在违规增设行政审批事项、增加受理条件和办理环节、要求开具“奇葩证明”等违规问题；是否存在“吃拿卡要”和“提篮子”“打牌子”“拉款子”以及勾结黑中介，设置“门槛”、暗箱操作、利益输送、权力寻租问题，或帮助有利益关联的中介机构或人员违规操作、进行有偿代理等“窗口腐败”问题。</van-collapse-item>
          </van-collapse>
        </div>


      </div>


      <div class="vote-field">

        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="我要投好评" clickable @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="我要投差评" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>


        <van-field v-model="tel" type="tel" label="手机号" />

        <div v-show="radio == 2">
          <van-field
              v-model="sms"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button :disabled=smsBtnDisable size="small" type="primary" @click="sendSmsCode">{{smsBtnMsg}}</van-button>
            </template>
          </van-field>
        </div>

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
        <van-button :disabled=is_disable type="primary" size="large" @click="submitVote">提交</van-button>
      </div>
    </div>


  </div>
</template>

<script>

import PublicHeader from "@/components/PublicHeader";
import default_goods_img from "@/assets/rw.jpeg";
import {user, vote, sms} from "@/api";

export default {
    name: "Vote",
    components: {
      PublicHeader,
    },
    created: function () {
      // @todo 改成用Id去搜索的形式
      if (this.$route.params.hasOwnProperty('id')) {
        this.getUser(this.$route.params.id);
      } else {
        this.$toast('无候选窗口，2秒后回到首页');
        let that = this;
        setTimeout(() => {
          that.$router.replace({
            path: "/"
          });
        }, 2000);
      }
    },
    data() {
      return {
        is_disable:false,
        default_goods_img: default_goods_img,
        sms:'',
        tel:'',
        message:'',
        radio:'1',
        user: {
          'err':1
        },
        hasBeenVote:0,
        activeName:'1',
        smsBtnMsg:"发送验证码",
        smsBtnDisable:false,
        interval:0,
        stillSetInterval:true
      };
    },
    methods: {
      returnHome() {
        this.$router.replace({
          path: "/"
        });
      },
      getUser(u_id) {
        let that = this;
        user(u_id).then(function (response) {
          let data = response.data;
          if (data.code === 0) {
            that.user = data.data;
          }
          return false;
        }).catch(e => {
          console.log(e);
          that.$toast('网络繁忙,请稍后再试~');
        });
      },
      // 发送短信验证码
      sendSmsCode() {
        let that = this;
        that.smsBtnDisable = true;
        let tel = that.tel;
        if(!(/^1[3456789]\d{9}$/.test(tel))){
          that.$toast('手机号格式不正确~');
          that.smsBtnDisable = false;
          return false;
        }

        let requestData = {
          tel: that.tel
        };

        sms(requestData).then(function (response) {
          let data = response.data;

          if (data.data.is_lock === true) {
            that.$toast('您今日获取验证码次数已达上限~');
            that.smsBtnDisable = false;
            that.stillSetInterval = false;
            return false;
          } else {
            that.$toast('验证码已发送至您的手机,请注意查收~');
            that.interval = setInterval(function() {
              set60time(that)
            },1000);
            return false;
          }
        }).catch(e => {
          console.log(e);
          that.smsBtnDisable = false;
          that.$toast('网络繁忙，请稍后再试!');
        })

        // 发送验证码的前端限制
        let countDown = 60;
        function set60time(obj){
          console.log(countDown);

          if (countDown <= 0) {
            if (obj.interval !== 0) {
              // 清除定时器
              clearInterval(obj.interval);
            }
            countDown = 60;
            obj.smsBtnMsg = "获取验证码";
            obj.smsBtnDisable = false;
          } else {
            obj.smsBtnMsg = "重新发送(" + countDown + ")";
            obj.smsBtnDisable = true;
            countDown--;
          }
        }
      },
      submitVote() {

        this.is_disable = true;

        // 参数检查也在这里做了算了
        if (this.$store.state.activeTime <= 0)  {
          this.$toast('活动已结束~');
          this.is_disable = false;
          return false;
        }

        let that = this;
        let type = parseInt(that.radio);
        let tel = that.tel;
        let message = that.message;
        let sms = that.sms;
        let typeSet = new Set([1,2]);

        if (type.length === 0 || typeSet.has(type) === false) {
          that.$toast('请选择好评或者差评~');
          that.is_disable = false;
          return;
        }

        if(!(/^1[3456789]\d{9}$/.test(tel))){
          that.$toast('手机号格式不正确~');
          that.is_disable = false;
          return false;
        }

        if (type === 2 && sms.length === 0) {
          that.$toast('请填写短信验证码~');
          that.is_disable = false;
          return;
        }

        if (message.length === 0) {
          that.$toast('请填写具体事由~');
          that.is_disable = false;
          return;
        }

        let requestData = {
          id: that.user.id,
          type: type,
          tel: that.tel,
          message: that.message,
          sms: that.sms,
        };

        // 投票
        vote(requestData).then(function (response) {
          let data = response.data;

          if (data.code === 0) {
            that.$toast('投票成功, 感谢您的参与, 点击返回参与别的投票吧!');
            // setTimeout(() => {
            //   that.$router.replace({
            //     path: "/"
            //   });
            // }, 1000);
            // that.is_disable = false;
            return false;
          } else if (data.code === 100) {
            that.$toast('您今天已经投过票了~');
            that.is_disable = false;
            return false;
          } else if (data.code === 101) {
            that.$toast('该窗口今日已达获取票数上限~');
            that.is_disable = false;
            return false;
          } else {
            that.$toast('网络繁忙，请稍后再试~');
            that.is_disable = false;
          }

          return false;
        }).catch(e => {
          console.log(e);
          that.is_disable = false;
          that.$toast('网络繁忙，请稍后再试!');
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
    font-size: 38px;
    height: 80px;
    line-height: 80px;
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

  .no-user{
    padding: 100px 0px;
  }

  .vote-info-ruler-item{
    text-align: left;
  }

  .span-ruler-notice{
    color: orangered;
  }

</style>
