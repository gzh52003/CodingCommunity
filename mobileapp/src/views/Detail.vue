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
        to="/cart"
      />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="popupShowChange" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <van-popup v-model="popupShow" position="bottom" round :style="{ height: '10%' }" class="popup">
      <h4>加入数量:</h4>
      <van-stepper v-model.number="popupTotal" theme="round" button-size="22" disable-input />
      <van-button round type="danger" @click="addTrolley">加入购物车</van-button>
    </van-popup>
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
  Popup,
  Stepper,
  Button,
} from "vant";
import NavBar from "../components/NavBar";
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(ImagePreview);
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(Stepper);
Vue.use(Button);

export default {
  name: "Goods",
  data() {
    return {
      //goodsData: {},
      title: "商品详情",
      popupShow: false,
      popupTotal: 0,
      successShow: false,
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
        let curTrolley = JSON.parse(JSON.stringify(this.cartlist));
        //判断现有的购物车商品列表中是否存在要加入的商品,并记录其在现有列表的下标
        let curNum = 0,
          hasCurGoods = curTrolley.some((item, idx) => {
            curNum = idx;
            return item._id == this.goodsData._id;
          });
        //存在则增加数量,不存在则加入商品
        if (hasCurGoods) {
          curTrolley[curNum].total += this.popupTotal;
        } else {
          curTrolley.push(this.goodsData);
          curTrolley[curTrolley.length - 1].total = this.popupTotal;
          curTrolley[curTrolley.length - 1].checked = false;
        }
        //给vuex发送静态副本
        this.$store.commit("updateTrolley", curTrolley);
        //使用静态副本生成发送请求的参数
        let RequestTrolley = curTrolley.map((item) => {
          return {
            goodsId: item._id,
            goodsTotal: item.total,
          };
        });
        this.$request
          .post("/trolley", {
            userId: JSON.parse(window.localStorage.getItem("userInfo"))._id,
            goodsInfo: JSON.stringify(RequestTrolley),
          })
          .then((res) => {
            if (res.data.code == 1001) {
              Dialog.alert({
                message: "加入成功",
              }).then(() => {
                this.popupShow = false;
              });
            } else {
              Dialog.alert({
                message: "加入失败",
              }).then(() => {
              });
            }
          });
        Dialog.alert({
          message: "加入成功",
        }).then(() => {
          this.popupShow = false;
        });
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
    popupShowChange() {
      this.popupShow = true;
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
.van-popup {
  h4 {
    font-size: 16px;
    float: left;
    margin-right: 10px;
    margin-left: 10px;
  }
  .van-stepper {
    float: left;
    height: 64px;
    line-height: 64px;
  }
  .van-button {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>