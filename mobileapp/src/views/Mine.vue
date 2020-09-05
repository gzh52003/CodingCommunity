<template>
  <div class="mine">
    <van-notice-bar scrollable text="着西装打呔,攞大哥电话有咩用呀?吓!跟啲咁嘅大佬,吔屎丫你!" />
    <section class="userinfo">
      <van-button type="danger" size="small" @click="exitCLick" plain >退出</van-button>
      <div class="showMe">
        <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <h2>欢迎你！{{userInfo.username}}</h2>
      </div>
      <van-grid>
        <van-grid-item icon="star-o" text="收藏夹" />
        <van-grid-item icon="eye-o" text="我看过的" />
        <van-grid-item icon="shop-collect-o" text="收藏店铺" />
        <van-grid-item icon="discount" text="优惠券" />
      </van-grid>
    </section>

    <section class="myOrder">
      <figure>
         <h2>我的订单</h2>
         <span>查看全部订单》</span>
      </figure>
     
      <van-grid>
        <van-grid-item icon="star-o" text="待付款" badge="9" />
        <van-grid-item icon="eye-o" text="待发货" badge="9" />
        <van-grid-item icon="shop-collect-o" text="待收货" badge="9" />
        <van-grid-item icon="discount" text="评价" badge="9" />
        <van-grid-item icon="discount" text="售后" />
      </van-grid>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import {
  NoticeBar,
  Image as VanImage,
  Button,
  Dialog,
  Grid,
  GridItem,
} from "vant";
Vue.use(VanImage);
Vue.use(NoticeBar);
Vue.use(Button);
Vue.use(Grid);
Vue.use(GridItem);
export default {
  data(){
    return{
      userInfo:''
    }
  },
  created(){
    // this.userInfo = localStorage.getItem('userInfo')
    // console.log(JSON.parse(this.userInfo))
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log(this.userInfo)
  },
  methods: {
    exitCLick() {
      Dialog.confirm({
        title: "退出确认",
        message: "你确定要退出吗？？？",
      })
        .then(() => {
          // on confirm
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang='scss'>
body,
html {
  background-color: #f2f2f2;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.userinfo {
  .van-button{
    position: relative;
    left: 311px;
    top: 10px;
  }
  background-image: linear-gradient(to right, #fd9126, #ff5000);
  .showMe {
    
    h2 {
      display: inline-block;
      transform: translate(11px, -38px);
    }
    .van-image {
      width: 70px !important;
      height: 70px !important;
      margin-left: 20px;
    }
  }
  h2 {
    text-align: center;
  }
  .van-grid-item__content{
      background-color: rgba($color: #fff, $alpha: 0);
      color: #fff;
      .van-grid-item__text{
        color: #fff;
      }
    }
}

.myOrder {
  margin-top: 10px;
  background-color: #fff;
  display: flex;
  overflow: hidden;
  position: absolute;
  width: 351px;
  height: auto;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 12px;
  flex-direction: column;
  .van-grid{
    flex-shrink: 0;
    flex-wrap: nowrap;
    .van-grid-item__content{
      padding: 13px 0px;
      
    }
  }
  figure{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    margin: 0;
    padding: 0 10px;
    box-sizing: border-box;
    span{
      line-height: 40px;
          color: rgb(153, 153, 153);
    }
  }
}
</style>