<template>
  <div>
    <div v-if="products.length > 0" class="mescroll-container-u">
      <div
          :class="{card: true, odd: index % 2}"
          @click="seeGood(product.sku_id)"
          v-for="(product, index) in products"
          :key="index"
      >
        <div class="img">
<!--          <img class="good-img" v-lazy="product.product_pic_url" v-if="product.product_pic_url" />-->
<!--          <img :src="default_goods_img" alt class="good-img" v-else />-->

          <img :src="default_goods_img" alt class="good-img"/>
        </div>
        <div class="name">将来</div>
        <div class="money">123</div>
        <!--<span class="discount" >{{(product.original_price | NumberFormat)|| (product.sale_price | NumberFormat)}}</span>-->
      </div>
    </div>

    <div v-else></div>
  </div>
</template>

<script>
import default_goods_img from "@/assets/rw.jpeg";

/**
 * 横向商品卡片 223px
 *
 * @notice 注意图片最好和容器的大小保持一致
 */
export default {
  name: "VoteCard",
  props: {
    products: {
      type: Array,
      default: () => [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
      ]
    }
  },
  created: function() {},
  data: function() {
    return {
      default_goods_img: default_goods_img
    };
  },
  methods: {
    seeGood: function(sku_id) {
      this.$router.push({
        name: "Goods",
        params: {
          sku_id: sku_id
        }
      });
    }
  }
};
</script>

<style scoped>
.mescroll-container-u {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}

.card {
  width: 280px;
  background-color: #fff;
  margin-top: 20px;
}

.card .img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  /*height: 223px;*/
  background-color: #fff;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid rgba(255, 123, 5, 1);/*no*/
  align-self: flex-start;
}

.card .name {
  height: 60px;
  font-size: 24px; /*px*/
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 30px;
  padding: 0px 10px 0px 10px;
  margin-top: 20px;
}

.card .money {
  font-size: 32px;
  font-weight: 500;
  color: rgba(255, 123, 5, 1);
  padding: 0px 10px 10px 10px;
}

.card .discount {
  padding-left: 12px;
  text-decoration: line-through;
  color: #828689;
}

.good-img {
  max-height: 100%;
  max-width: 100%;
}

.odd {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
