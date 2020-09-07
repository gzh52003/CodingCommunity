<template>
  <div>
    <!-- 头部 -->
    <van-sticky>
      <p @click="goback">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </p>
      <h2>购物车</h2>
      <p @click="change">
        <span v-if="changesuccess">完成</span>
        <span v-else>编辑</span>
        <van-icon name="chat-o" />
      </p>
    </van-sticky>

    <!-- 商品订单 -->

    <van-card
      :num="item.num"
      :price="item.pricecurrent"
      :title="item.title"
      :thumb="item.imgurl"
      :key="item._id"
      v-for="item in goodslist"
      @click="gotoDetail($event,item._id)"
    >
      <template #tag>
        <van-checkbox v-model="item.checked"></van-checkbox>
      </template>
      <template #price>
        <p>
          <span>￥{{item.pricecurrent}}</span>
          <van-stepper v-model="item.num" input-width="20px" button-size="20px" />
        </p>
      </template>
    </van-card>

    <!-- 结算订单 -->
    <template v-if="changesuccess">
      <van-submit-bar :price="totalPrice" button-text="删 除" @submit="removeItem">
        <van-checkbox v-model="check">全选</van-checkbox>
      </van-submit-bar>
    </template>

    <template v-else>
      <van-submit-bar :price="totalPrice" button-text="结 算" @submit="onSubmit">
        <van-checkbox v-model="check">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送,
          <span>修改地址</span>
        </template>
      </van-submit-bar>
    </template>
  </div>
</template>


<script>
import Vue from "vue";
import {
  Sticky,
  Tab,
  Tabs,
  Card,
  Icon,
  SubmitBar,
  Stepper,
  Dialog,
} from "vant";

Vue.use(Sticky);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Card);
Vue.use(Icon);
Vue.use(SubmitBar);
Vue.use(Stepper);

export default {
  name: "Cart",
  data() {
    return {
      changesuccess: false,
    };
  },
  computed: {
    goodslist() {
      return this.$store.state.cart.goodslist;
    },
    check: {
      get() {
        return this.goodslist.every((item) => item.checked);
      },
      set(val) {
        this.$store.commit("allcheck", val);
      },
    },

    totalPrice() {
      // return this.goodslist.reduce((pre, item) => pre + item.pricecurrent * item.num, 0) * 100;
      return this.$store.getters.totalPrice;
    },
  },
  methods: {
    goback() {
      this.$router.push("/home/");
    },


    change() {
      this.changesuccess = !this.changesuccess;
    },
    gotoDetail(e, id) {
      if (e.target.tagName === "IMG") {
        this.$router.push("/goods/" + id);
      }
    },
    removeItem() {
      Dialog.confirm({
        message: "确定删除该商品吗？",
      })
        .then(() => {
          this.$store.commit("remove");
        })
        .catch(() => {});
    },
    onSubmit() {
      console.log(this.$store.state);
      if(this.$store.state.username ===''){
        this.$router.push('./login')
      }else{
         this.$router.push("./summary");
      }
     
     
    },
  },
  created() {
    this.$store.commit("displayTabbar", false);
  },

  beforeDestroy() {
    this.$store.commit("displayTabbar", true);
  },
};
</script>

<style lang="scss" scoped>
//头部
/deep/.van-sticky {
  height: 50px;
  background: orangered;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  color: #fff;

  h2 {
    font-size: 20px;
  }
  p {
    font-size: 16px;
    line-height: 18px;
    vertical-align: middle;
  }
}

// 商品
.van-image {
  left: 30px;
}

.van-card__title {
  font-size: 14px;
  margin-top: 6px;
  font-weight: 600;
  position: absolute;
  left: 30px;
}

.van-card__price {
  color: red;
  font-weight: 600;
  position: absolute;
  left: 30px;
  top: 34px;
  font-size: 16px;
}

.clearCart {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  // text-align: right;
}

.van-submit-bar__button {
  font-weight: 600;
  font-size: 18px;
}
</style>