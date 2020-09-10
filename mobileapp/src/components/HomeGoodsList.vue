<template>
  <div>
    <van-grid :column-num="2" :gutter="10" class="goodslist">
      <van-grid-item v-for="item in goodslist" :key="item._id" :to="'/detail/'+item._id">
        <lazy-component>
          <van-image :src="item.imgUrl" />
        </lazy-component>
        <!-- 标题超过12个字则使用省略号 -->
        <h4>{{ item.three_subtit.length <= 12 ? item.three_subtit:item.three_subtit.substr(0,11) + "..."}}</h4>
        <p class="describe">
          <span class="price">￥{{item.price}}</span>
          <span class="rest">{{item.rest}}人已购买</span>
        </p>
      </van-grid-item>
      <!-- </van-grid>
        <van-grid :border="false" :column-num="3" class="goodslist">
      <van-grid-item v-for="item in recommend" :key="item._id" @click="gotoDetail(item._id)">
        <van-image :src="item.img_url" />
        <h4>{{item.goods_name}}</h4>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.sales_price}}</span>
        </p>
      </van-grid-item>-->
    </van-grid>
    <div id="loadMoreing">{{loadMoreText}}</div>
    <!-- 上拉加载数据 -->
  </div>
</template>
<script>
import Vue from "vue";
import { Grid, GridItem, Lazyload } from "vant";
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Lazyload, {
  lazyComponent: true,
});
export default {
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      //请求数据时为false,数据返回后为true,只有该属性为true时才可请求更多数据
      loadMore: false,
      loadMoreText:"正在加载...",
      goodslist: [],
    };
  },
  methods: {
    scrollRun: function () {
      // 核心代码
      try{
        if (this.loadMore) {
          //
          let bodyWidth = document.body.offsetWidth;
          let bodyHeight = window.innerHeight * (375 / bodyWidth); // 以6s屏幕为基准比例
          let loadMoreTop =
            document.getElementById("loadMoreing").getBoundingClientRect().top *
            (375 / bodyWidth); //loadMore距离顶部的距离

          if (bodyHeight - loadMoreTop > 50) {
            //loadMore被拉出底部50px时
            // console.log("bodyHeight",bodyHeight,"loadMoreTop",loadMoreTop,"差值",bodyHeight-loadMoreTop,"页码",this.dataCurPage+1);
            this.loadMore = false; //停止运行scrollRun,防止同一时间多次加载
            this.getMoreList();
          }
        }
      }catch(err){
        console.log(err);
      }
    },
    async getMoreList() {
      const result = await this.$request.get("/goods", {
        params: {
          pageSize: this.pageSize,
          pageNo: ++this.pageNo,
        },
      });
      const { data } = result.data;
      let goodslist = this.goodslist;
      if (data.length >= 10) {
        data.forEach((item) => {
          goodslist.push(item);
        });
        this.loadMore = true;
      }else{
        this.loadMoreText = "别拉了,没数据了 呜呜呜/(ㄒoㄒ)/~~"
      }
    },
  },
  async created() {
    //vue实例创建时,请求数据,并添加到datalist数据中
    const result = await this.$request.get("/goods", {
      params: {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      },
    });
    const { data } = result.data;
    this.goodslist = data;
    this.loadMore = true;
  },
  mounted: function () {
    let onScroll = window.addEventListener("scroll", this.scrollRun); // 监听滚动
  },
};
</script>
<style lang="scss">
#loadMoreing {
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  margin-bottom: 50px;
}
.goodslist {
  h4 {
    font-size: 14px;
  }
}
.describe {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: red;
}
</style>