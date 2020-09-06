<template>
  <div>
    <van-grid :column-num="2" :gutter="10" class="goodslist">
      <van-grid-item v-for="item in datalist" :key="item._id" :to="'/detail/'+item._id">
        <lazy-component>
          <van-image :src="item.imgUrl" />
        </lazy-component>
        <h4>{{item.three_subtit}}</h4>
        <p class="describe">
          <span class="price">￥{{item.price}}</span>
          <span class="rest">{{item.rest}}人已购买</span>
        </p>
      </van-grid-item>
    <!-- </van-grid>
        <van-grid :border="false" :column-num="3" class="goodslist">
      <van-grid-item v-for="item in recommend" :key="item._id" @click="gotoDetail(item._id)">
        <van-image :src="item.img_url" />
        <h4>{{item.goods_name}}</h4>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.sales_price}}</span>
        </p>
      </van-grid-item>-->
    </van-grid> 
    <div id="loadMoreing" v-show="loadMoreing">正在加载...</div>
    <!-- 上拉加载数据 -->
  </div>
</template>
<script>
import Vue from "vue";
import { Grid, GridItem, Lazyload } from "vant";
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Lazyload, {
  lazyComponent: true,
});
export default {
  data() {
    return {
      pageSize: 20,
      pageNo: 1,
      loadMoreing: true,
    }
  },
  computed:{
    datalist(){
      return this.$store.state.tmplist.datalist
    }
  }
  // async created() {
  //   const result = await this.$request.get("/goods", {
  //     params: {
  //       pageSize: this.pageSize,
  //       pageNo: this.pageNo,
  //     },
  //   });
  //   const { data } = result.data;
  //   this.datalist = data;
  // },
};
</script>
<style lang="scss">
#loadMoreing {
  line-height: 30px;
  font-size: 14px;
  text-align: center;
}
.goodslist{
  h4{font-size:14px}
}
.describe{
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: red;
}
</style>