<template>
  <div class="mine">
    <van-notice-bar scrollable text="着西装打呔,攞大哥电话有咩用呀?吓!跟啲咁嘅大佬,吔屎丫你!" />
    <van-nav-bar
  title="我的信息"
  left-text="返回"
  right-text="更多"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
    <section class="userinfo">
      <div class="showMe">
        <van-image round  src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <h2 style="font-size:16px">欢迎你！
          <button @click='gotoLogin' v-if='userInfo.username=="请登录"'>{{userInfo.username}}</button>
          <span v-else>{{userInfo.username}}</span>
          </h2>
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
         <h2 style="font-size:16px">我的订单</h2>
         <span style="font-size:16px;line-height:43px">查看全部订单》</span>
      </figure>
     
      <van-grid>
        <van-grid-item icon="star-o" text="待付款" badge="" />
        <van-grid-item icon="eye-o" text="待发货" badge="" />
        <van-grid-item icon="shop-collect-o" text="待收货" badge="" />
        <van-grid-item icon="discount" text="评价" badge="" />
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
  NavBar
} from "vant";
import { Toast } from 'vant';
Vue.use(VanImage);
Vue.use(NoticeBar);
Vue.use(Button);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(NavBar);
export default {
  data(){
    return{
      userInfo:'',
      
    }
  },

  created(){
    // this.userInfo = localStorage.getItem('userInfo')
    // console.log(JSON.parse(this.userInfo))
     this.userInfo = JSON.parse(localStorage.getItem('userInfo'))||{username:'请登录'}
  },

  
  methods: {
    onClickLeft() {
      Toast('返回');
      this.$router.back()
   
    },
    gotoLogin(){
      this.$router.replace('/login')
    },
    onClickRight() {
      this.$router.push('/more')
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
  box-sizing: border-box;
    width: 351px;
    margin-left: 12px;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 10px;
  .van-button{
    position: relative;
    left: 311px;
    top: 10px;
  }
  // background-image: linear-gradient(to right, #fd9126, #ff5000);
  background: #fff;
  .showMe {
    h2 {
      display: inline-block;
      transform: translate(11px, -38px);
    }
    .van-image {
      width: 70px !important;
      height: 70px !important;
      margin: 10px 0 0 20px;
    }
  }
  h2 {
    text-align: center;
  }
  // .van-grid-item__content{
  //     background-color: rgba($color: #fff, $alpha: 0);
  //     color: #fff;
  //     .van-grid-item__text{
  //       color: #fff;
  //     }
  //   }
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