<template>
  <div>
    <van-nav-bar left-text="确认订单" left-arrow @click-left="onClickLeft" />

    <van-card
      :num="item.total"
      :price="item.price"
      :title="item.three_subtit"
      :thumb="item.imgUrl"
      :key="item._id"
      v-for="item in goodslist"
    >
      <template #price>
        <p>
          <span>￥{{item.price}}</span>
        </p>
      </template>
    </van-card>

    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="summary">
      <p>共{{goodsNum}}件</p>
    </van-submit-bar>
  </div>
</template>


<script>
import Vue from "vue";
import { SubmitBar, NavBar, Dialog, Toast } from "vant";
Vue.use(SubmitBar);
Vue.use(NavBar);
Vue.use(Dialog);
Vue.use(Toast);
export default {
  name: "Summary",
  data() {
    return {
      userInfo: "",
    };
  },
  computed: {
    goodslist() {
      return this.$store.state.cart.goodslist.filter((item) => item.checked);
    },
    totalPrice() {
      return (
        this.goodslist.reduce((pre, item) => pre + item.price * item.total, 0) *
        100
      );
    },
    goodsNum() {
      return this.goodslist.reduce((pre, item) => {
        return pre + item.total;
      }, 0);
    },
  },
  methods: {
    onClickLeft() {
      this.$router.push("./cart");
    },
    summary() {
      Dialog.confirm({
        message: "确认下单吗?",
      })
        .then(() => {
          let orderGoodsInfo = this.goodslist.map((item) => {
            return {
              goodsId: item._id,
              total: item.total,
            };
          });
          let curTrolley = this.$store.state.cart.goodslist;
          this.$request
            .post("/order", {
              userId: JSON.parse(window.localStorage.getItem("userInfo"))._id,
              goodsList: JSON.stringify(orderGoodsInfo),
              total: this.totalPrice / 100,
            })
            .then((res) => {
              if (res.data.code === 1001) {
                Toast.success("下单成功");
                let localSurplus = curTrolley
                  .filter((item) => !item.checked);
                let surplus = localSurplus
                  .map((goods) => {
                    return {
                      goodsId: goods._id,
                      goodsTotal: goods.total,
                    };
                  });
                this.$request
                  .post("/trolley", {
                    userId: JSON.parse(window.localStorage.getItem("userInfo"))
                      ._id,
                    goodsInfo: JSON.stringify(surplus),
                  })
                  .then((res) => {
                      console.log("summary",res);
                    if (res.data.code === 1001) {
                      this.$store.commit("updateTrolley", localSurplus);
                      this.$router.replace("./cart");
                    } else {
                      Toast.fail("购物车保存失败");
                    }
                  })
                  .catch((res) => {
                    Toast.fail("购物车接口无响应");
                  });
              } else {
                Toast.fail("下单失败");
              }
            })
            .catch((res) => {
              Toast.fail("下单接口无响应");
            });
        })
        .catch(() => {
          Toast.fail("您已取消下单");
        });
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
/deep/ .van-nav-bar {
  .van-icon {
    color: #000;
    font-size: 22px;
  }

  .van-nav-bar__text {
    color: #000;
    font-size: 18px;
  }
}
</style>