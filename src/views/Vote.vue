<template>
  <div class="vote-container">
    <div class="return" @click="returnHome">
      返回
    </div>

    <div class="vote-share" @click="share">
      分享
    </div>

    <PublicHeader></PublicHeader>

    <van-dialog
        @confirm="shareDialogConfirm"
        v-model="dialog_show"
        title="长按保存图片分享"
        theme="round-button"
        confirm-button-text="返回主页"
    >
      <img :src="posterImg" v-if="posterImg" class="dialog-img">
    </van-dialog>

<!--    <div class="posterHtml" id="posterHtml" v-show="true" :style="{backgroundImage: 'url('+share_background_img+')'}">-->
    <div class="posterHtml" id="posterHtml" v-show="false">
      <img :src="share_background_img" alt="">
      <!-- 二维码 -->
      <div class="qrcode">
        <div id="qrcodeImg" ref="qrcodeImg" class="qrcodeImg"></div>
      </div>
      <div class="poser-notice">长按识别图中二维码，快来帮我投票吧~</div>
    </div>

    <div v-if="user.err === 1" class="no-user">
      暂无候选窗口,请点击左上角返回重新选择。
    </div>
    <div v-else>
      <div class="join-window">
        <img v-lazy="user.creatives[0].curl" alt="" class="item-image">
      </div>

      <div class="base-info">
        <div class="u-name">
          {{ user.name }}窗口
        </div>
        <div class="u-unit">
          好评数： {{ user.upvotes }},
          差评数： {{ user.downvotes }}
        </div>
      </div>

      <div class="vote-info-3">
        <div class="vote-info-ruler-notice">
          测评内容
        </div>

        <div class="vote-info-ruler-item">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item title="工作作风方面" name="1">
              窗口工作人员在行政审批和政务服务中是否存在<span class="span-ruler-notice">不作为、慢作为、乱作为、假作为等形式主义官僚主义问题，是否存在业务不精、推诿扯皮、态度生硬、服务不优、慵懒散拖等问题；是否存在落实首问责任制、一次性告知制、限时办结制等有关规定不力，让企业群众多头跑、重复跑等问题；是否存在审批事项虚进、假进服务大厅，搞“两头受理”“体外循环”“隐性审批”，致使办事效率低下、群众满意度不高等问题。</span>
            </van-collapse-item>
            <van-collapse-item title="违纪违法方面" name="2">
              窗口工作人员在行政审批、政务服务中是否遵纪守法，是否存在<span class="span-ruler-notice">违规增设行政审批事项、增加受理条件和办理环节、要求开具“奇葩证明”等违规问题；是否存在“吃拿卡要”和“提篮子”“打牌子”“拉款子”以及勾结黑中介，设置“门槛”、暗箱操作、利益输送、权力寻租问题，或帮助有利益关联的中介机构或人员违规操作、进行有偿代理等“窗口腐败”问题。</span>
            </van-collapse-item>
            <van-collapse-item title="责任落实方面" name="3">各窗口是否履行行政审批和政务服务主体责任、监管责任情况，是否及时学习传达、研究部署关于推进审批服务便民化、“放管服”改革和“一件事一次办”改革、优化营商环境，以及“清廉大厅”建设工作安排；是否建立健全政务服务大厅全过程监督、问效和考核评价等工作机制；是否结合实际制定措施办法，加强对中介机构的监督管理等。
            </van-collapse-item>
          </van-collapse>
        </div>


      </div>

      <div class="vote-field">

        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="我要投好评" clickable @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1"/>
              </template>
            </van-cell>
            <van-cell title="我要投差评" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>


        <van-field v-model="tel" type="tel" label="手机号"/>

        <div v-show="radio == 2">
          <van-field
              v-model="sms"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button :disabled=smsBtnDisable size="small" type="primary" @click="sendSmsCode">{{ smsBtnMsg }}
              </van-button>
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
        <van-field
            v-model="gpitem"
            rows="1"
            autosize
            label="期望关注的高频事项"
            type="textarea"
            placeholder="期望高频事项"
        />
      </div>
    </div>

        <div class="tttttt" v-show="nc_show">
          <div id="nc"></div>
        </div>
      <div class="vote-submit" v-if="user.err !== 1">
        <van-button :disabled=is_disable type="primary" size="large" @click="submitVote">提交</van-button>
      </div>


  </div>
</template>
<script src="https://g.alicdn.com/AWSC/AWSC/awsc.js"></script>

<script>
// 生成海报
import html2canvas from 'html2canvas';
// 生成二维码
import QRCode from 'qrcodejs2';

import PublicHeader from "@/components/PublicHeader";
import share_background_img from "@/assets/header.jpeg";
import {user, vote, sms} from "@/api";

export default {
  name: "Vote",
  components: {
    PublicHeader,
  },
  created: function () {
    // 查找用户
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
  mounted() {
    window.nc = null;
    // 生成二维码
    // window.location.href
    let path = process.env.NODE_ENV === "development" ? "http://www.baidu.com" : window.location.href;
    this.createQrcode(path);
    let that = this;
  },
  data() {
    return {
      nc_show:true,
      is_disable: false,
      share_background_img: share_background_img,
      sms: '',
      tel: '',
      message: '',
      gpitem:'',
      radio: '1',
      user: {
        'err': 1
      },
      hasBeenVote: 0,
      activeName: '1',
      smsBtnMsg: "发送验证码",
      smsBtnDisable: false,
      interval: 0,
      stillSetInterval: true,
      posterImg: '', // 最终生成的海报图片
      dialog_show:false,
      sessionId:'',
      sig:'',
      token:'',
      nc: null,
      aliCheckShow: false
    };
  },
  methods: {
    aliSmsCheck() {
      let that = this;
      // 实例化nc
      AWSC.use("nc", function (state, module) {
          // 初始化
          window.nc = module.init({
              // 应用类型标识。它和使用场景标识（scene字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
              appkey: "FFFF0N0000000000A8FC",
              //使用场景标识。它和应用类型标识（appkey字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
              scene: "nc_message_h5",
              // 声明滑动验证需要渲染的目标ID。
              renderTo: "nc",
              hideErrorCode: true,
              // test: module.TEST_BLOCK, // 测试滑动失败状态
              //前端滑动验证通过时会触发该回调参数。您可以在该回调参数中将会话ID（sessionId）、签名串（sig）、请求唯一标识（token）字段记录下来，随业务请求一同发送至您的服务端调用验签。
              success: function (data) {
                  // console.log("sessionId");
                  // console.log(data.sessionId);
                  //                   console.log("sig");
                  // console.log(data.sig);
                  //                   console.log("token");
                  // console.log(data.token);
                  // window.console && console.log(data.sessionId)
                  // window.console && console.log(data.sig)
                  // window.console && console.log(data.token)

                  that.sessionId = data.sessionId;
                  that.sig = data.sig;
                  that.token = data.token;
              },
              // 滑动验证失败时触发该回调参数。
              fail: function (failCode) {
                  console.log("failCode");
                   window.console && console.log(failCode)
              },
              // 验证码加载出现异常时触发该回调参数。
              error: function (errorCode) {
                console.log("errorCode");
                window.console && console.log(errorCode)
              }
          });
      })
    },
    shareDialogConfirm() {
        this.returnHome();
    },
    returnHome() {
      this.$router.replace({
        path: "/"
      });
    },
    getUser(u_id) {
      let that = this;
      user(u_id).then(function (response) {
        let data = response.data;

        if (data.hasOwnProperty('code')) {
          that.nc_show = false;
          that.$toast('网络忙，请稍后再试！');
          return false;
        }
        that.nc_show = true;
        if (data.hasOwnProperty('ttl')) {
          let ttl = data.ttl * 1000;
          that.$store.commit('setActiveTime', ttl);

          that.$store.commit('setActiveTime', ttl);
          that.user = data.item;
        }

        that.aliSmsCheck();
        return false;
      }).catch(e => {
        that.nc_show = false;
        console.log(e);
        that.$toast('网络繁忙,请稍后再试~');
      });
    },
    // 非活动期
    isActivePeriod() {
      if (this.$store.state.activeTime <= 0)  {
        this.$toast('活动已结束~');
        return false;
      }
      return true;
    },
    // 发送短信验证码
    sendSmsCode() {

      if (false === this.isActivePeriod()) {
        return ;
      }


      let that = this;
      that.smsBtnDisable = true;

      let tel = that.tel;
      if (!(/^1[3456789]\d{9}$/.test(tel))) {
        that.$toast('手机号格式不正确~');
        that.smsBtnDisable = false;
        return false;
      }

      if (
            that.sessionId.length === 0 ||
            that.sig.length === 0 ||
            that.token.length === 0
        ) {
          that.$toast('请先滑动进行验证~');
          that.smsBtnDisable = false;
          return;
      }

      let requestData = {
        session:that.sessionId,
        sig:that.sig,
        token:that.token,
        ci:that.$store.state.c_id,
        phone:that.tel
      };

      sms(requestData).then(function (response) {
        let data = response.data;
        if (data.code !== 200) {
          that.$toast(data.msg);
          that.smsBtnDisable = false;
          that.stillSetInterval = false;
          that.resetNcData();
          window.nc.reset();
          return false;
        } else {
          that.$toast('验证码已发送至您的手机,请注意查收~');
          that.interval = setInterval(function () {
            set60time(that)
          }, 1000);
          return false;
        }
      }).catch(e => {
        console.log(e);
        that.resetNcData();
        window.nc.reset();
        that.smsBtnDisable = false;
        that.$toast('网络繁忙，请稍后再试!');
      })

      // 发送验证码的前端限制
      let countDown = 60;

      function set60time(obj) {
        // console.log(countDown);

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
    resetNcData() {
        this.sessionId = '';
        this.sig = '';
        this.token = '';
    },
    submitVote() {

      if (false === this.isActivePeriod()) {
        return ;
      }

      this.is_disable = true;

      let that = this;

      let type = parseInt(that.radio);
      let tel = that.tel;
      let message = that.message;
      let sms = that.sms;
      let typeSet = new Set([1, 2]);

      if (type.length === 0 || typeSet.has(type) === false) {
        that.$toast('请选择好评或者差评~');
        that.is_disable = false;
        return;
      }

      if (!(/^1[3456789]\d{9}$/.test(tel))) {
        that.$toast('手机号格式不正确~');
        that.is_disable = false;
        return false;
      }

      if (
            that.sessionId.length === 0 ||
            that.sig.length === 0 ||
            that.token.length === 0
        ) {
          that.$toast('请先滑动进行验证~');
          this.is_disable = false;
          return;
      }

      if (type === 2 && sms.length === 0) {
        that.$toast('请填写短信验证码~');
        that.is_disable = false;
        return;
      }

      if (type === 2 && message.length === 0) {
        that.$toast('请填写具体事由~');
        that.is_disable = false;
        return;
      }

      let requestData = {
        ids: [that.user.id],
        type: type,
        phone: that.tel,
        message: that.message+"shixiang999@|"+that.gpitem,
        vcode: that.sms
      };

      // 投票
      vote(requestData, that.$store.state.c_id).then(function (response) {
        let data = response.data;

        if (data.code === 200) {
          that.$dialog.confirm({
            title: '投票成功',
            cancelButtonText:'返回主页',
            confirmButtonText:'分享助力',
            message: '感谢您的参与, 点击分享为窗口生成海报宣传助力吧~',
          }).then(() => {
              that.share();
          }).catch(() => {
              // 点击取消
              that.$router.replace({
                path: "/"
              });
          });
          return false;
        } else {
          that.$toast(data.msg);
          that.is_disable = false;
        }

        that.resetNcData();
        window.nc.reset();
        return false;
      }).catch(e => {
        console.log(e);
        that.resetNcData();
        window.nc.reset();
        that.is_disable = false;
        that.$toast('网络繁忙，请稍后再试!');
      })

    },
    share() {
      this.createPoster();
      let that = this;
      setTimeout(function () {
        that.dialog_show = true;
      }, 1000);
    },
    createPoster() {
      // 生成海报
      const vm = this
      const domObj = document.getElementById('posterHtml')
      html2canvas(domObj, {
        useCORS: true,
        allowTaint: false,
        logging: false,
        letterRendering: true,
        onclone(doc) {
          let e = doc.querySelector('#posterHtml')
          e.style.display = 'block'
        }
      }).then(function(canvas) {
        // 在微信里,可长按保存或转发
        vm.posterImg = canvas.toDataURL('image/jpeg')
        // document.body.appendChild(canvas);
      })
    },
    createQrcode(text) {
      this.$refs.qrcodeImg.innerHTML = ''; //清除二维码方法一
      let qrcode = new QRCode(this.$refs.qrcodeImg, {
        text: text, //页面地址 ,如果页面需要参数传递请注意哈希模式#
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      })
    }
  }
}
</script>

<style scoped lang="less">
.vote-container {
  position: relative;
  width: 750px;
  background-color: #FBF6F9;
}

.join-window {
  padding: 10px;
}

img {
  max-width: 100%;
}

.base-info {
  color: #225a93;
}

.u-name {
  font-weight: bold;
  font-size: 36px;
  color: #225a93;
  height: 40px;
  line-height: 40px;
  padding-top: 40px;
}

.u-unit {
  padding-top: 30px;
  margin-bottom: 30px;
  font-size: 28px;
}


.vote-info-3 {
  line-height: 44px;
  border: 1px solid #225a93; /*no*/
  width: 600px;
  margin: 0 auto;
  border-radius: 4px;
  padding: 10px 0px;
  background-color: white;
}

.vote-info-ruler-notice {
  font-weight: bold;
  font-size: 38px;
  height: 80px;
  line-height: 80px;
}

.vote-field {
  width: 600px;
  margin: 0 auto;
  padding-top: 60px;
}

.van-cell__title {
  text-align: left !important;
}

.vote-submit {
  width: 600px;
  margin: 0 auto;
  padding: 20px 0px 80px 0px;
}

.return {
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

.vote-share {
  position: fixed;
  top: 40px;
  right: 10px;
  z-index: 1000;
  width: 80px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  font-size: 18px;
  background-color: black;
  opacity: 0.2;
  color: white;
}

.no-user {
  padding: 100px 0px;
}

.vote-info-ruler-item {
  text-align: left;
}

.span-ruler-notice {
  color: orangered;
}

.poser-image {
  width: 500px;
  height: 500px;
  margin: 0 auto;
}

.poser-image img {
  max-width: 100%;
}

.posterHtml{
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: contain;

  //margin-bottom: 100px;
}

.qrcodeImg{
  width: 500px;
  height: 500px;
  margin: 0 auto;
}

.qrcodeImg img {
  max-width: 100%;
}

.qrcode{
  padding-top: 20px;
}

.poser-notice{
  height: 100px;
  line-height: 100px;
}

.dialog-img{
  padding-top: 20px;
}

.tttttt{
  position: relative;
  width:600px !important;
  margin: 0 auto;
  padding-bottom: 60px;
    padding-top: 10px;
    // z-index:99999;
    // background-color: #E8E8E8;
}

.nc-container .nc_wrapper{
  width: 100% !important;
}

.nc-container #nc_1_wrapper{
    width: 100% !important;
}

</style>
