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
    <van-notice-bar mode="link">
      <div class="notice-bar">
        <span>
          <van-icon name="passed" />100%严选正品
        </span>
        <span>
          <van-icon name="passed" />全程质检严选
        </span>
        <span>
          <van-icon name="passed" />售后服务无忧
        </span>
      </div>
    </van-notice-bar>
    <home-goods-list/>
    <div class="long"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Sticky, Search, Icon, NoticeBar } from "vant";
Vue.use(Sticky);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Icon);
Vue.use(NoticeBar);

import HomeGoodsList from "../components/HomeGoodsList"

export default {
  data() {
    return {
      topbarUI: {
        topbarClass: "topbar trans",
      },
      searchValue: "",
    };
  },
  methods: {
    scrollHandle(e) {
      //调用闭包+节流处理
      this.scrolThrottling()(e);
    },
    scrolThrottling() {
      //声明闭包+节流处理
      let throttling = null;
      let topbarUI = this.topbarUI;
      return (e) => {
        if (throttling !== null) {
          return;
        }
        throttling = setTimeout(() => {
          let top = e.srcElement.scrollingElement.scrollTop; // 获取页面滚动高度
          if (top < 50) {
            topbarUI.topbarClass = "topbar trans";
          } else {
            topbarUI.topbarClass = "topbar white";
          }
          throttling = null;
        }, 500);
      };
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle); // 绑定页面的滚动事件
  },
  components:{
    HomeGoodsList
  }
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

.van-notice-bar{
  height: 20px;
  margin-bottom: 10px;
}
.notice-bar {
  width: 350px;
  //height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.long {
  height: 2000px;
  background: linear-gradient(to bottom, red, blue);
}
</style>
