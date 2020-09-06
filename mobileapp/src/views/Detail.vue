<template>
  <div>
    <NavBar :title="title"></NavBar>
    <van-image :src="tmpdata.imgUrl" @click="showBig"></van-image>
    <div class="goods-info">
      <h1>{{tmpdata.three_subtit}}</h1>
      <van-tag plain type="primary">{{tmpdata.tag}}</van-tag>
      <p class="price">
        <del>{{tmpdata.price}}</del>
        <span>{{tmpdata.price}}</span>
      </p>
    </div>

    <van-goods-action class="goods-actions">
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartlist.length" @click="goto('/cart')" to="/cart"/>
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车"  />
      <van-goods-action-button type="danger" text="立即购买"  />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from "vue";
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ImagePreview,
} from "vant";
import NavBar from "../components/NavBar";
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(ImagePreview);

export default {
  name: "Goods",
  data() {
    return {
      recommend: [],
      title: "商品详情",
    };
  },
  computed: {
    tmpdata() {
      return this.$store.state.tmplist.datalist.filter((item) => {
        return this.$route.params.id == item._id;
      })[0];
    },
    cartlist(){
      return this.$store.state.cart.goodslist
    }
  },
  methods: {
    showBig() {
      ImagePreview({
        images: [
          this.tmpdata.imgUrl,
          this.tmpdata.imgUrl,
          this.tmpdata.imgUrl,
          this.tmpdata.imgUrl,
        ],
        closeable: true,
      });
    },
  },
  created() {
    console.log(this.tmpdata);
  },
  components: {
    NavBar,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
};
</script>
<style lang="scss" scoped>
.goods-info {
  padding: 15px;
  h1 {
    font-size: 18px;
  }
  .price{
    color: red;
    font-size: 20px;
  }
}
.goodslist {
  h4 {
    font-size: 14px;
  }
}
.goods-actions{
  z-index:100;
}
</style>