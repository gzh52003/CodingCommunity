<template>
  <div class="reg">
    <h1>欢迎来到德莱联盟！</h1>
    <h3>皇牌飞行员申请出战</h3>
    <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{pattern , required: true, message: userTips }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{pattern, required: true, message: pswTips }]"
      />

      <van-field
        v-model="ma"
        type="text"
        
        name="ma"
        label="短信验证码"
        placeholder="手机号"
       :rules="[{ validator, message: '请输入正确内容',trigger:'onChange' }]"
      />

      <van-button type="info" size="small" v-if="sendClick" class="sendma" @click='sendma' :disabled="show">点击发送验证码</van-button>
      <van-count-down :time="time" format="ss 秒后重发" @finish='finish' v-else />

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @failed="onFailed">注册</van-button>
      </div>
    </van-form>
    <p class="readme">
      已阅读并同意以下协议
      <a
        href="https://terms.alicdn.com/legal-agreement/terms/TD/TD201609301342_19559.html"
        target="_blank"
      >金丰平台服务协议</a>、
      <a
        href="https://terms.alicdn.com/legal-agreement/terms/suit_bu1_taobao/suit_bu1_taobao201703241622_61002.html"
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
import { Form, Dialog, CountDown } from "vant";
Vue.use(Form);
Vue.use(CountDown);
export default {
  data() {
    return {
      time: 3 * 1000,
      username: "",
      password: "",
      ma:'',
      pattern: /(\w|\.){6,12}/,
      sendClick: true,
      show:true
    };
  },
  methods: {
    sendma(){
      
      this.sendClick = false
    },
    finish(){
      this.sendClick = true
    },
    validator(value,rules){
     if(/^1[3,4,5,6,7,8]\d{9}$/.test(value)){
       console.log('验证成功')
       this.show = false
       return true
     }else{
       console.log('验证失败')
       this.show = true
       return false
     }
      // console.log(value)
      // console.log('132',rules.pattern.test(value))
      // if (!this.pattern.test(value)) {
      //   value = "请输入正确的格式";
      // } 
        
      // else if(rules.pattern.test(value)){
      //   console.log(this.show)
      //   this.show=false
      // }

      // return value;
    },
    userTips(value, rules) {
      console.log("value1", value, rules);
     
      if (!rules.pattern.test(value)) {
        value = "请输入正确的格式";
      } else {
        return value;
      }

      
    },
    pswTips(value, rules) {
    
  
      if (!rules.pattern.test(value)) {
        value = "请输入正确的格式";
      } else {
        return value;
      }
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    async onSubmit(values) {
      console.log("submit", values);
      const { data } = await this.$request.get("/reg/check", {
        params: { userName: values.username },
      });
      console.log("data.code", data.code);
      if (data.code === 1) {
        const { data } = await this.$request.post("/reg", {
          ...values,
        });
        console.log(data);
        Dialog.alert({
          title: "注册成功",
          message: "即将为您跳转到登录页",
          theme: "round-button",
        }).then(() => {
          this.$router.push("/login");
        });
      } else {
        Dialog.alert({
          title: "用户名已注册",
          message: "重新选个好名字吧",
          theme: "round-button",
        }).then(() => {
          // on close
        });
      }
    },
  },
};
</script>

<style lang='scss'>
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
</style>