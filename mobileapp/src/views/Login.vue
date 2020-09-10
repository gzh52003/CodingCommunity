<template>
  <div class="login">
    <van-nav-bar
  title="登录页"
  left-text="返回首页"
  left-arrow
  @click-left="onClickLeft"
/>
    <h3>欢迎来到金丰娱乐~</h3>
    <h4>登录发现惊喜！</h4>
    <van-image round width="150" height="150" src="https://img.yzcdn.cn/vant/cat.jpeg" />
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
        autocomplete="off"
      ></van-field>
      <div v-html="vcodeSvg" class="vcode" @click="getVcode"></div>
      <!-- 7天免登陆 -->
      <van-field name="mdl" label="7天免登陆">
        <template #input>
          <van-switch v-model="switchChecked" size="20" />
        </template>
      </van-field>

      <!-- 提交按钮 -->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>

      <!-- 免费注册 -->
      <div style="margin: 16px;">
        <van-button type="primary" round block to="/reg">免费注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Field, Button, Switch, Image as VanImage, Dialog,NavBar } from "vant";
Vue.use(VanImage);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Switch);
Vue.use(NavBar);
export default {
  data() {
    return {
      tips: "请输入正确的格式",
      username: "",
      password: "",
      vcode: "",
      switchChecked: false,
      vcodeSvg: "",
      status:0
    };
  },
  created() {
    this.getVcode();
    // this.$store.commit("displayTabbar", false);
  },
  //  beforeDestroy() {
  //   this.$store.commit("displayTabbar", true);
  // },
  methods: {
    onClickLeft(){
      this.$router.push('./home')
    },
    async getVcode() {
      let { data } = await this.$request.get("/vcode");
      this.vcodeSvg = data.data.svg;
    },
    //点击后发起请求
    async onSubmit(values) {
      const { data } = await this.$request.get("/login", {
        params: {
          
          ...values,
          
        },
      });
      if (data.code === 1) {
        this.$store.commit('login11',values.username)
        //设置localStorage
        localStorage.setItem("userInfo", JSON.stringify(data.data));

        Dialog.alert({
          message: "登录成功！",
          theme: "round-button",
        }).then(() => {
            let user = JSON.parse(window.localStorage.getItem('userInfo'));
            if(user){
              this.$request.get("/trolley/"+user._id).then(res=>{
                this.$store.commit("updateTrolley",res.data.data.trolleyitems)
              })
            }
          this.$router.replace("/mine");
        });
      } else if(data.code === 403){
        Dialog.alert({
          message: "该用户已被禁用！",
          theme: "round-button",
        }).then(() => {
          this.username = "";
          this.password = "";
          this.vcode = "";
        });
      }
      
      else{
        Dialog.alert({
          message: "用户名或密码错误，请重新输入",
          theme: "round-button",
        }).then(() => {
          this.username = "";
          this.password = "";
          this.vcode = "";
        });
      }
    },
  },

};
</script>

<style lang='scss' scoped>
.vcode {
  display: inline-block;
  // position: absolute;
  transform: translate(217px, -50px);
  position: absolute;
}
.login {
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 20px;
    margin: 10px;
  }
}
</style>