<template>
  <div class="login">
    <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: tips }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: tips }]"
      />
      <van-field
        v-model="vcode"
        type="text"
        name="vcode"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: tips }]"
      ></van-field>
      <div v-html="vcodeSvg" class="vcode" @click="getVcode"></div>
      <!-- 7天免登陆 -->
      <van-field name="mdl" label="7天免登陆">
        <template #input>
          <van-switch v-model="switchChecked" size="20" />
        </template>
      </van-field>
      <van-button type="primary" size="small" plain to="/reg">免费注册</van-button>
      <!-- 提交按钮 -->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Field, Button, Switch, Image as VanImage, Dialog } from "vant";
Vue.use(VanImage);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Switch);
export default {
  data() {
    return {
      tips: "哈哈哈哈",
      username: "",
      password: "",
      vcode: "",
      switchChecked: false,
      vcodeSvg: "",
    };
  },
  created() {
    this.getVcode();
  },
  methods: {
    async getVcode() {
      let { data } = await this.$request.get("/vcode");
      this.vcodeSvg = data.data.svg;
    },
    //点击后发起请求
    async onSubmit(values) {
      console.log("submit", values);
      const { data } = await this.$request.get("/login", {
        params: {
          ...values,
        },
      });
      console.log(data.code);
      if (data.code === 1) {
        this.$router.push("/mine");
      } else if (data.code === 10) {
        Dialog.alert({
          message: "用户名或密码错误，请重新输入",
          theme: "round-button",
        }).then(() => {
          this.username = ''
          this.password = ''
          this.vcode = ''
        });
      }
    },
  },
};
</script>

<style lang='scss'>
.vcode {
  display: inline-block;
  // position: absolute;
  transform: translate(217px, -50px);
  position: absolute;
}
</style>