<template>
  <div class="home">
    <div class="head-img-decorate"></div>
    <div :class="topbarUI.topbarClass">
      <span class="top-icon">
        <van-icon name="apps-o" size="30" />
        <br />
        <span>节目表</span>
      </span>
      <van-search
        class="search"
        v-model="searchValue"
        shape="round"
        background="transparent"
        placeholder="请输入搜索关键词"
      />
      <span class="top-icon">
        <van-icon name="apps-o" :to="{ path: '/discover' }" size="30" />
        <br />
        <span>分类</span>
      </span>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="@/assets/img/swipe.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/img/swipe.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/img/swipe.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/img/swipe.jpg" alt />
      </van-swipe-item>
    </van-swipe>
    <a href="">
        <span></span>
        <span></span>
        <span></span>
    </a>
    <div class="long"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Sticky, Search, Icon } from "vant";
Vue.use(Sticky);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Icon);

export default {
  data() {
    return {
      topbarUI: {
        topbarClass: "topbar trans",
      },
      searchValue: "",
      throttling: null,
    };
  },
  methods: {
    scrollHandle: function (e) {
      //节流处理
      if (this.throttling !== null) {
        return;
      }
      this.throttling = setTimeout(() => {
        var top = e.srcElement.scrollingElement.scrollTop; // 获取页面滚动高度
        console.log(top);
        if (top < 50) {
          this.topbarUI.topbarClass = "topbar trans";
        } else {
          this.topbarUI.topbarClass = "topbar white";
        }
        this.throttling = null;
      }, 500);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle); // 绑定页面的滚动事件
  },
};
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  padding-top: 54px;
}
.head-img-decorate {
  background-color: #e92d31;
  width: 100%;
  height: 4.053rem;
  margin-bottom: -4.053rem;
  border-radius: 0 0 15% 15%;
  overflow: hidden;
  position: absolute;
  top: 0px;
}
.topbar {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  .search {
    flex: 1;
  }
  .top-icon {
    margin: 0 10px;
    text-align: center;
    font-size: 0;
    line-height: 14px;
    font-size: 12px;
    text-align: center;
  }
}
.trans {
  //background: transparent;
  color: #fff;
  p {
    color: #fff;
  }
}
.white {
  background: #fff;
  color: #333;
}
.my-swipe {

  width: 92%;
  height: 155px;
  margin: 0 auto;
  border-radius: 10px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  img {
    width: 100%;
  }
}
.long {
  height: 2000px;
  background: linear-gradient(to bottom, red, blue);
}
</style>