<template>
  <div class="range-container">
    <PublicHeader></PublicHeader>
      <div class="range">
        <ul>
          <li class="number-1">
            <div class="range-base"><span>1</span><span>张三</span></div>
            <div class="range-tickets">1000<span>票</span></div>
          </li>
          <li class="number-2">
            <div class="range-base"><span>1</span><span>张三</span></div>
            <div class="range-tickets">1000<span>票</span></div>
          </li>
          <li class="number-3">
            <div class="range-base"><span>1</span><span>张三</span></div>
            <div class="range-tickets">1000<span>票</span></div>
          </li>
          <li class="number-normal">
            <div class="range-base"><span>1</span><span>张三</span></div>
            <div class="range-tickets">1000<span>票</span></div>
          </li>
        </ul>
      </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>

import PublicHeader from "@/components/PublicHeader";
import BottomNav from "@/components/BottomNav";

export default {
  name: "Range",
  components: {
    PublicHeader,
    BottomNav
  }
}
</script>

<style scoped>

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

  .number-1{
    background-color: #FA3773;
    color: white;
  }

  .number-2{
    background-color: #FB9A3A;
    color: white;
  }

  .number-3{
    background-color: #38B0FE;
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
