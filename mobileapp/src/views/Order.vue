<template>
<div>
  <div v-if="userInfo.length===0">订单为空</div>
  <van-swipe-cell v-else >
    <van-card
      v-for="item in goodlist"
      :num="item.queryList[0].total"
      :price="item.queryList[0].price"
      desc="描述信息"
      :title="item.queryList[0].three_subtit"
      class="goods-card"
      :thumb="item.queryList[0].imgUrl"
      :key="item.createTime"
    >
      <template #tags>
    <!-- <van-button plain type="info" size="small" @click='detail(item._id)'>订单详情</van-button> -->

  </template>
    </van-card>
  </van-swipe-cell>
  
</div>
</template>

<script>
import Vue from "vue";
import { SwipeCell, Card,Button  } from "vant";
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(Button);
export default {
  data() {
    return {
      userInfo: "",
      goodlist:[]
    };
  },
  methods:{
    // async detail(id){
    //   console.log(id)
    //   const {data} = await this.$request.get('/order/detail/'+id)
    //    console.log(data)

    // }
   
  },
  async created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    let result
    if (this.userInfo._id) {
      const userId = this.userInfo._id;
       result = await this.$request.get(
        "/order/userOrder?userId=" + userId
      );
      this.userInfo = result.data.data;
      // console.log("userInfo", this.userInfo);


      let goods = []
      this.userInfo.forEach( async item=>{
        let good=[]
        good = await this.$request.get('/order/detail/'+item._id)
       goods.push(good.data.data[0])
       this.goodlist = goods
       console.log('goodlist=',this.goodlist)
      })
     
      
    }else{

    }
    

  },
};
</script>

<style lang='scss'>
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
</style>