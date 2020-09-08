<template>
  <div>
    <NavBar :title="title"></NavBar>
    <van-image :src="goodsData.imgUrl" @click="showBig"></van-image>
    <div class="goods-info">
      <h1>{{goodsData.three_subtit}}</h1>
      <van-tag plain type="primary">{{goodsData.tag}}</van-tag>
      <p class="price">
        <del>{{goodsData.price}}</del>
        <span>{{goodsData.price}}</span>
      </p>
    </div>

    <van-goods-action class="goods-actions">
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="cartlist.length"
        @click="goto('/cart')"
        to="/cart"
      />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addTrolley" />
      <van-goods-action-button type="danger" text="立即购买" />
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
  Dialog,
} from "vant";
import NavBar from "../components/NavBar";
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(ImagePreview);
Vue.use(Dialog);

export default {
  name: "Goods",
  data() {
    return {
      //goodsData: {},
      title: "商品详情",
    };
  },
  computed: {
    cartlist() {
      return this.$store.state.cart.goodslist;
    },
    goodsData() {
      return this.$store.state.current.goodsInfo;
    },
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
    addTrolley() {
      if (window.localStorage.getItem("userInfo")) {
        //深拷贝现在的购物车商品列表,生成静态副本
        let curTrolley = JSON.parse(
          JSON.stringify(this.cartlist)
        );
        //判断现有的购物车商品列表中是否存在要加入的商品,并记录其在现有列表的下标
        let curNum = 0,
          hasCurGoods = curTrolley.some((item, idx) => {
            curNum = idx;
            return item._id == this.goodsData._id;
          });
        //存在则增加数量,不存在则加入商品
        if (hasCurGoods) {
          curTrolley[curNum].total++;
        } else {
          curTrolley.push(this.goodsData);
          curTrolley[curTrolley.length - 1].total = 1;
          curTrolley[curTrolley.length - 1].checked = false;
        }
        //给vuex发送静态副本
        this.$store.commit("updateTrolley",curTrolley)
      } else {
        Dialog.confirm({
          message: "请先登录",
        })
          .then(() => {
            this.$router.push("/login/");
          })
          .catch(() => {});
      }
    },
  },
  async created() {
    const result = await this.$request.get("/goods/" + this.$route.params.id);
    const { data } = result.data;
    this.$store.commit("updateCurrentGoodsInfo", data[0]);
  },
  destroyed() {
    this.$store.commit("removeCurrentGoodsInfo");
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
  .price {
    color: red;
    font-size: 20px;
  }
}
.goodslist {
  h4 {
    font-size: 14px;
  }
}
.goods-actions {
  z-index: 100;
}
</style>