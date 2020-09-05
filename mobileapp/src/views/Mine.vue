<template>
  <div class="mine">
    <van-notice-bar scrollable text="着西装打呔,攞大哥电话有咩用呀?吓!跟啲咁嘅大佬,吔屎丫你!" />
    <section>
      <van-button type="danger" size="small" @click="exitCLick">退出</van-button>
      <div class="imgshow">
        <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <h2>我的名字</h2>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { NoticeBar, Image as VanImage, Button, Dialog } from "vant";
Vue.use(VanImage);
Vue.use(NoticeBar);
Vue.use(Button);

export default {
  methods: {
    exitCLick() {
      Dialog.confirm({
        title: "退出确认",
        message: "你确定要退出吗？？？",
      })
        .then(() => {
          // on confirm
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang='scss'>
section {
  background-image: linear-gradient(to right, #fd9126, #ff5000);
  .imgshow {
    display: flex;
    justify-content: center;
  }
  h2 {
    text-align: center;
  }
}
</style>