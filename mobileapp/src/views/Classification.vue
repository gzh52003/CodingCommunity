<template>
  <div class="wrapper">
    <NavBar :title="title"></NavBar>
    <div class="main">
      <van-sticky>
        <van-tabs @click="show" v-model="activeKey">
          <van-tab v-for="item in tags" :key="item" :title="item"></van-tab>
        </van-tabs>
      </van-sticky>
    </div>

    <div class="goods_wrapper">
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item
          icon="photo-o"
          v-for="item in dataList"
          :key="item._id"
          :to="'/detail/'+item._id"
        >
          <lazy-component>
            <van-image :src="item.imgUrl" />
          </lazy-component>
          <p class="txt">{{item.three_subtit}}</p>
          <p class="describe">
            <span class="price">{{item.price}}</span>
            <span class="buy">{{item.rest}}人已购买</span>
          </p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs, Grid, GridItem, Image, Lazyload, Sticky } from "vant";
import NavBar from "../components/NavBar.vue";
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Image);
Vue.use(Sticky);
export default {
  data() {
    return {
      activeKey: 0,
      tags: [],
      tagsOrigin: [],
      dataList: [],
      title: "列表",
    };
  },
  methods: {
    async show() {
      const search = this.tagsOrigin[this.activeKey];
      const result = await this.$request.get("/goods/classify/" + search);
      const { data } = result.data;
      this.dataList = data;
    },
  },
  goto(_id) {
    console.log(_id);
  },
  async created() {
    const result = await this.$request.get("/goods");
    const { data } = result.data;
    data.forEach((item) => {
      if (!this.tagsOrigin.includes(item.tag)) {
        this.tagsOrigin.push(item.tag);
      }
    });
    this.tags = this.tagsOrigin.map((item) => {
      switch (item) {
        case "foods":
          item = "美食";
          break;
        case "living":
          item = "家居";
          break;
        case "cook":
          item = "厨具";
          break;
        case "clothes":
          item = "服装";
          break;
        case "beauty":
          item = "护肤";
          break;
      }
      return item;
    });
    this.show();
  },
  components: {
    NavBar,
  },
};
</script>
<style lang="scss" scoped>
html,
body {
  height: 100%;
}
.wrapper {
  background: #f0f0f0;
  height: 100%;
  .main {
    margin-top: 2px;
  }
}
.txt {
  height: 40px;
  line-height: 20px;
  margin-bottom: 0;
  font-size: 14px;
}
.goods_wrapper {
  margin-top: 10px;
}
.describe {
  .price {
    font-size: 16px;
    color: #ec0002;
    &::before {
      content: "￥";
    }
    position: relative;
    left: -9px;
  }
  .buy {
    color: #ccc;
    font-size: 10px;
    margin-left: 50px;
  }
}
</style>