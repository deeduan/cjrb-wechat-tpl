<template>
  <div class="range-container">
    <PublicHeader></PublicHeader>
      <div class="range">
        <ul>
          <div>

          </div>
          <li
              class="number-normal"
              v-for="(item, index) in list"
              v-bind:class="[(new Set([0,1,2])).has(index) ? 'number-'+index : '']"
          >
            <div class="range-base"><span>{{ index+ 1}}</span><span>{{item.name}}</span></div>
            <div class="range-tickets">{{item.upvote}}<span>票</span></div>
          </li>
        </ul>
      </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>

import PublicHeader from "@/components/PublicHeader";
import BottomNav from "@/components/BottomNav";
import {range} from "@/api";
import default_goods_img from "@/assets/rw.jpeg";

export default {
  name: "Range",
  components: {
    PublicHeader,
    BottomNav
  },
  data() {
    return {
      list: [],
      rangeTop3: new Set([0,1,2])
    };
  },
  mounted() {
    let that = this;
    let param = {
        ci:that.$store.state.c_id
    };
    range(param).then(function (response) {
      let data = response.data;

      if (data.hasOwnProperty('code')) {
        that.$toast('网络繁忙,请稍后再试!');
        return false;
      }

      if (data.length > 0) {
        that.list = data;
      }

      return false;
    }).catch(e => {
      console.log(e);
      that.$toast('网络繁忙,请稍后再试~');
    });
  }
}
</script>

<style scoped>

  .range-container{
    padding-bottom: 100px;
  }
  ul{
    padding: 20px;
  }

  li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .number-0{
    background-color: #FA3773 !important;
    color: white;
  }

  .number-1{
    background-color: #FB9A3A !important;
    color: white;
  }

  .number-2{
    background-color: #38B0FE !important;
    color: white;
  }

  .number-normal{
    background-color: #FBF6F9;
  }
  span{
    padding-left: 20px;
    font-weight: bold;
  }
</style>
