<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" route v-show="showTabbar">
      <van-tabbar-item
        :badge="item.name==='cart'?cartLength:''"
        :icon="item.icon"
        v-for="item in menu"
        :key="item.name"
        :to="item.path"
      >{{item.text}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Button,
  Tabbar,
  TabbarItem,
  Tag,
  Image,
  ImagePreview,
  Field,
  Checkbox,
} from "vant";
Vue.use(Image);
Vue.use(ImagePreview);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag);
Vue.use(Field);
Vue.use(Checkbox);
export default {
  data() {
    return {
      active: 0,
      // showMenu:true,
      menu: [
        {
          name: "home",
          path: "/home",
          icon: "wap-home-o",
          text: "首页",
        },
        {
          name: "classification",
          path: "/classification",
          icon: "apps-o",
          text: "分类",
        },
        {
          name: "cart",
          path: "/cart",
          icon: "shopping-cart-o",
          text: "购物车",
        },
        {
          name: "mine",
          path: "/mine",
          icon: "user-o",
          text: "我的",
        },
      ],
    };
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      if (newVal === "/login" || newVal === "/reg") {
        this.$store.state.common.showTabbar = false;
      } else {
        this.$store.state.common.showTabbar = true;
      }
    },
  },
  computed: {
    cartLength() {
      return this.$store.state.cart.goodslist.length;
    },
    showTabbar() {
      return this.$store.state.common.showTabbar;
    },
  },
  created() {
    let user = JSON.parse(window.localStorage.getItem("userInfo"));
    if (user) {
      this.$request.get("/trolley/"+user._id).then(res=>{
        console.log(res);
      this.$store.commit("updateTrolley",res.data.data.trolleyitems)
      })
    }else{
      this.$store.commit("clearTrolley");
    }
  },
};
</script>
<style lang="scss">
html {
  font-size: 41.4px;
}

.price {
  del {
    color: #999;
    margin-right: 5px;

    &::before {
      content: "￥";
    }

    span {
      color: #f00;

      &::before {
        content: "￥";
      }
    }
  }
}
</style>