<template>
  <div class="introduce-container">

      <PublicHeader></PublicHeader>

      <div class="intro-info">

      <div class="intro-info-1">
        为进一步落实“放管服”改革及“清廉大厅”建设，为办事企业群众提供廉洁高效、贴心周到的政务服务，特开展清廉窗口测评活动。
      </div>

        <div class="intro-info-2">
          洪江市政务服务中心“政务服务清廉窗口测评”评选活动开始啦，请为你支持的窗口投票吧!
        </div>
        <div class="intro-info-3">
          <div class="intro-info-ruler-notice">
            投票说明
          </div>
          <div class="intro-info-ruler-item">
            1、投票时间: 7月11日(周一) 00:00-7月27日 (周三)
            24:00;
          </div>
          <div class="intro-info-ruler-item">
            2、每人(每个手机号)每天最多可投5票差评、10票好评，获取10次短信验证码，每天0点重置资格，每人(每个手机号)每天对同一窗口最多可投1票好评；
          </div>
          <div class="intro-info-ruler-item">
            3、每个窗口每天最高可获得5000票好评；
          </div>
          <div class="intro-info-ruler-item">
            4、本次活动排行榜仅展示好评，最终排行由洪江市政务服务中心综合评定并公布；
          </div>
          <div class="intro-info-ruler-item">
            5、本次活动最终解释权归洪江市政务服务中心。投票过程中一旦发现有恶意刷票行为，取消相应窗口资格。
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
