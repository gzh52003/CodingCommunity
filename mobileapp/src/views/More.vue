<template>
  <div>
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      style="color:#34495E"
    />

    <van-cell-group class="info">
      <template #title>
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <van-cell value="点我编辑" :title="'用户名:'+userInfo.username" />
        <van-cell title="我的收货地址" is-link />
      </template>
    </van-cell-group>

    <van-cell-group style="margin:5px 0">
      <van-cell title="账户安全" is-link />
    </van-cell-group>

    <van-cell-group style="margin:5px 0">
      <van-cell title="支付设置" is-link />
    </van-cell-group>

    <van-cell-group style="margin:5px 0">
      <van-cell title="地区设置" is-link />
      <van-cell title="隐私" is-link />
      <van-cell title="通用" is-link />
    </van-cell-group>

    <van-cell-group style="margin:5px 0">
      <van-cell title="问题反馈" is-link />
      <van-cell title="关于金丰" is-link />
    </van-cell-group>

    <van-cell-group style="margin:5px 0;text-align: center;">
      <van-cell title="退出登录" @click="exit" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Toast, Cell, CellGroup, Dialog } from "vant";
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NavBar);
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))||{};
  },
  methods: {
    exit() {
      Dialog.confirm({
        title: "确定要退出吗？",
      }).then(() => {
        localStorage.removeItem("userInfo");
        this.$router.push("/login");
      });
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang='scss' scoped>
.van-nav-bar {
  .van-icon {
    color: #646566;
  }
  color: #646566;
  .van-nav-bar__text {
    color: #646566;
  }
}
.van-cell-group__title {
    padding: 16px 0 8px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 150px;
  }
}
</style>