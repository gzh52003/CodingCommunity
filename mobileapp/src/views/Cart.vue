<template>
  <div>
    <!-- 头部 -->
    <van-sticky>
      <p @click="goback">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </p>
      <h2 @click="saveTrolley">购物车</h2>
      <p @click="change">
        <span v-if="changesuccess">完成</span>
        <span v-else>编辑</span>
        <van-icon name="chat-o" />
      </p>
    </van-sticky>

    <!-- 商品订单 -->

    <van-card
      :num="item.total"
      :price="item.price"
      :title="item.three_subtit"
      :thumb="item.imgUrl"
      :key="item._id"
      v-for="item in goodslist"
      @click="gotoDetail($event,item._id)"
    >
      <template #tag>
        <van-checkbox :value="item.checked" @click.stop="singleCheckedChange(item._id)"></van-checkbox>
      </template>
      <template #price>
        <p>
          <span>￥{{item.price}}</span>
          <van-stepper v-model="item.total" input-width="20px" button-size="20px" />
        </p>
      </template>
    </van-card>

    <!-- 结算订单 -->
    <template v-if="changesuccess">
      <van-submit-bar :price="totalPrice" button-text="删 除" @submit="removeItem">
        <van-checkbox v-model="allCheck">全选</van-checkbox>
      </van-submit-bar>
    </template>

    <template v-else>
      <van-submit-bar :price="totalPrice" button-text="结 算" @submit="onSubmit">
        <van-checkbox v-model="allCheck">全选</van-checkbox>
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
  Toast,
} from "vant";

Vue.use(Sticky);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Card);
Vue.use(Icon);
Vue.use(SubmitBar);
Vue.use(Stepper);
Vue.use(Toast);

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
    allCheck: {
      get() {
        return this.goodslist.every((item) => item.checked);
      },
      set(val) {
        this.$store.commit("allcheck", val);
        //return this.$store.getters.totalPrice;
      },
    },
    totalPrice() {
      // return this.goodslist.reduce((pre, item) => pre + item.pricecurrent * item.num, 0) * 100;
      return this.$store.getters.totalPrice;
    },
  },
  methods: {
    saveTrolley() {
      let goodsInfo = this.goodslist.map((item) => {
        return {
          goodsId: item._id,
          goodsTotal: item.total,
        };
      });
      Toast.loading({
        message: "购物车保存中",
        forbidClick: true,
      });
      this.$request
        .post("/trolley", {
          userId: JSON.parse(window.localStorage.getItem("userInfo"))._id,
          goodsInfo: JSON.stringify(goodsInfo),
        })
        .then((res) => {
          if(res.data.code === 1001){
            Toast.success('保存成功');
          }else{
            Toast.fail('保存失败');
          }
          console.log(res.data);
        });
    },
    singleCheckedChange(id) {
      this.$store.commit("singleCheck", id);
    },
    goback() {
      this.$router.push("/home/");
    },
    change() {
      this.changesuccess = !this.changesuccess;
    },
    gotoDetail(e, id) {
      if (e.target.tagName === "IMG") {
        this.$router.push("/detail/" + id);
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
      if (this.$store.state.username === "") {
        this.$router.push("./login");
      } else {
        this.$router.push("./summary");
      }
    },
  },
  // async created(){
  //   let user = JSON.parse(window.localStorage.getItem('userInfo'));
  //   if(user){
  //     let trolleyList = await this.$request.get("/trolley/"+user._id);
  //     console.log(trolleyList);
  //   }
  // }
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
    padding: 0 20px;
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