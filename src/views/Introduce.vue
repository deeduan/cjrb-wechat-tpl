<template>
  <div class="introduce-container">

      <PublicHeader></PublicHeader>

      <div class="intro-info">

      <div class="intro-info-1">
<!--         深入贯彻中央和省委、市委、区委全会精神，迎接党的
        二十大召开，从党的百年历程中汲取智慧力量、从感悟
        初心使命中砥砺责任担当，践行全心全意为人民服务的
        工作理念，以“向祖国报告”为主题，结合全国第六批社
        会管理和公共服务综合标准化试点项目建设，实现服务
        机制、服务水平、服务意识、服务能力、服务效果“五
        大提升”。 -->
        为进一步落实“放管服”改革及“清廉大厅”建设，为办事企业群众提供廉洁高效、贴心周到的政务服务，特开展“待亲人、办家事”清廉窗口测评活动。
      </div>

        <div class="intro-info-2">
          洪江市政务服务中心第一届“政务服务清廉窗口测评”
          评选活动开始啦，请为你支持的窗口投票吧!
        </div>
        <div class="intro-info-3">
          <div class="intro-info-ruler-notice">
            投票说明
          </div>
          <div class="intro-info-ruler-item">
            1、投票时间: 3月20日(周三) 00:00-3月25日 (周日)
            24:00;
          </div>
          <div class="intro-info-ruler-item">
            2、每人(每个手机号)每天最多可投5票差评，获取10次短信验证码，每天0点重置资格。
          </div>
          <div class="intro-info-ruler-item">
            3、每个窗口每天最高可获得500票好评。
          </div>
          <div class="intro-info-ruler-item">
            4、本次活动最终解释权归洪江市政务服务中心。投票过程中一旦发现有恶意刷票行为，取消相应窗口资格。
          </div>
        </div>
      </div>

      <BottomNav></BottomNav>
  </div>
</template>

<script>
    import PublicHeader from "@/components/PublicHeader";
    import BottomNav from "@/components/BottomNav";

    export default {
      name: "Introduce",
      components: {
        PublicHeader,
        BottomNav
      },
    }
</script>

<style scoped lang="less">

  .introduce-container{
    background-color: #FBF6F9;
    text-align: left;
    padding-bottom:100px;
  }
  .intro-info{
    background-color: #FBF6F9;
    padding: 14px;
    font-size: 28px;
  }

  .intro-info-1{
    padding: 10px 5px;
    //height: 100px;
    line-height: 44px;
    text-indent: 64px;
  }

  .intro-info-2{
    padding: 30px 5px;
    //height: 100px;
    line-height: 44px;
    text-indent: 64px;
  }

  .intro-info-3{
    padding: 30px 5px;
    //height: 100px;
    line-height: 44px;
    text-indent: 64px;
  }

  .intro-info-ruler-notice{
    font-weight: bold;
  }

</style>
