<template>
  <div class="reg">
    <h1>欢迎来到德莱联盟！</h1>
    <h3>皇牌飞行员申请出战</h3>
    <van-image round width="150" height="150" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{validator:userTips , required: true, message: '请输入正确的用户名格式',trigger:'onChange' }]"
      />
      <van-button
        type="info"
        size="small"
        v-if="sendClick1"
        class="checkUsername"
        @click="checkUsername"
        :disabled="show1"
      >检查用户名是否被注册</van-button>

      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        autocomplete="off"
        :rules="[{pattern:pswTips, required: true, message: '请输入6到12位的密码格式',trigger:'onChange' }]"
      />

      <van-field
        v-model="ma"
        type="text"
        name="ma"
        label="手机号"
        placeholder="手机号"
        autocomplete="off"
        :rules="[{required: true, validator:phoneCheck, message: '请输入正确手机号哦~',trigger:'onChange' }]"
      />

      <van-button
        type="info"
        size="small"
        v-if="sendClick"
        class="sendma"
        @click="sendma"
        :disabled="show"
      >点击发送验证码</van-button>
      <van-count-down :time="time" format="ss 秒后重发" @finish="finish" v-else />

      <van-field
        v-model="yzm"
        type="text"
        name="yzm"
        label="短信验证码"
        placeholder="验证码"
        autocomplete="off"
        :rules="[{required: true,  message: '验证码错误' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="primary" to="/login">返回登录页</van-button>
      </div>
    </van-form>
    <p class="readme">
      已阅读并同意以下协议
      <a
        href="https://terms.alicdn.com/legal-agreement/terms/TD/TD201609301342_19559.html"
        target="_blank"
      >金丰平台服务协议</a>、
      <a
        href="https://terms.alicdn.com/legal-agreement/terms/suit_bu1_taobao/sui4t_bu1_taobao201703241622_61002.html"
        target="_blank"
      >隐私权政策</a>、
      <a
        href="https://terms.alicdn.com/legal-agreement/terms/suit_bu1_taobao/suit_bu1_taobao201811121436_80276.html"
        target="_blank"
      >法律声明</a>、
      <a
        href="https://render.alipay.com/p/f/fd-jm7jym6r/alipay/multi-agreement.html"
        target="_blank"
      >金丰宝及客户端服务协议</a>
    </p>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Dialog, CountDown,Toast } from "vant";
Vue.use(Form);
Vue.use(CountDown);
Vue.use(Toast);
export default {
  data() {
    return {
      userMessage: "",
      time: 60 * 1000,
      username: "",
      password: "",
      ma: "",
      yzm: "",
      pswTips: /(\w|\.){6,12}/,
      // userTips: /(\w|\.){6,12}/,
      sendClick: true,
      sendClick1: true,
      show: true,
      show1:true
    };
  },

  methods: {
     userTips(val) {
       if (/(\w|\.){3,12}/.test(val)) {
        this.show1 = false;
        return true;
      } else {
        this.show1 = true;
        return false;
      }
    },

    async checkUsername(){
      console.log(this.username)
        const { data } = await this.$request.get("/reg/check", {
          params: {
            userName: this.username,
          },
        });
        if(data.code === 1){
          Toast.success('恭喜你，改用户名可以注册');
        }else{
          Toast.fail('用户名已存在');
        }
    },

    //发送验证码
    async sendma() {
      this.sendClick = false;
      console.log(this.ma);
      const { data } = await this.$request.get(`/sendSms/${this.ma}`);
    },
    //倒计时完成
    finish() {
      this.sendClick = true;
    },

    //手机号验证
    phoneCheck(value, rules) {
      if (/^1[3,4,5,6,7,8]\d{9}$/.test(value)) {
        this.show = false;
        return true;
      } else {
        this.show = true;
        return false;
      }
    },

    //点击注册按钮
    async onSubmit(values) {
      //发起请求，检查是否重名
      const { data } = await this.$request.get("/reg/check", {
        params: {
          userName: values.username,
        },
      });

      //code===1，不重名可以注册
      if (data.code === 1) {
        console.log(values);
        const { data } = await this.$request.post("/reg", {
          ...values,
        });
        console.log(data);
        if (data.code === 10) {
          Dialog.alert({
            title: "用户名已注册或验证码输入错误",
            message: "重新选个好名字吧或检查验证码是否有误",
            theme: "round-button",
          });
        } else {
          Dialog.alert({
            title: "注册成功",
            message: "即将为您跳转到登录页",
            theme: "round-button",
          }).then(() => {
            this.$router.push("/login");
          });
        }
      } else {
        Dialog.alert({
          title: "用户名已注册或验证码输入错误",
          message: "重新选个好名字吧或检查验证码是否有误",
          theme: "round-button",
        });
        console.log("data.code", data.code);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
h1 {
  font-size: 20px;
}
h3 {
  font-size: 20px;
  margin: 10px;
}
.readme {
  color: #999;
  font-size: 12px;
  margin-top: 26px;
  line-height: 20px;
  padding: 5px;

  a {
    color: #ff5000;
  }
}

.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}

.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}

.van-count-down {
  display: inline-block;
  position: absolute;
  transform: translate(229px, -31px);
}

.van-form .sendma {
  display: inline-block;
  position: absolute;
  transform: translate(229px, -37px);
}

.van-form .checkUsername{
  display: inline-block;
  position: absolute;
  transform: translate(229px, -37px);
}

</style>