<template>
  <div class="login">
    <el-container>
      <el-header class="header">掘金社区</el-header>
    </el-container>
    <h2>欢迎登录</h2>
    <el-row type="flex" justify="center">
      <el-form
        class="log"
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="80px"
        @keyup.enter.native="login()"
      >
        <el-form-item prop="userName" label="用户名">
          <el-input
            v-model="formData.userName"
            placeholder="请输入用户名"
            prefix-icon="icon-login_user"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            prefix-icon="icon-login_pwd"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item prop="vcode" label="验证码">
          <el-input placeholder="请输入验证码" v-model="formData.vcode">
            <template v-slot:append>
              <div v-html="vcodeSvg" class="code" @click="getVcode"></div>
            </template>
          </el-input>
        </el-form-item>

        <el-alert title="用户名或密码错误，请重新输入" type="error" v-if="error" center show-icon></el-alert>

        <el-form-item>
          <el-button
            size="small"
            type="primary"
            class="btn"
            @click="login('formData')"
            icon="el-icon-upload"
          >登录</el-button>
          <el-button size="small" @click="resetForm('formData')">重置</el-button>
          <el-checkbox v-model="formData.checked" style="color:#a0a0a0;margin-left:30px;">7天免登陆</el-checkbox>
        </el-form-item>

        <router-link to="reg" style="color:red">没有账号？马上注册</router-link>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        userName: "",
        password: "",
        checked: true,
        vcode: "",
      },
      vcodeSvg: "",
      error: false,
      rules: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        vcode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$request.get("login", {
            params: {
              username: this.formData.userName,
              password: this.formData.password,
              checked: this.formData.checked,
              vcode: this.formData.vcode,
            },
          });
          console.log(res);
          if (res.data.code === 1) {
            this.$message({
              type: "success",
              message: "登录成功",
            });

            // localStorage.setItem('token', JSON.stringify(res.data.data.authorization))
            localStorage.setItem("token", JSON.stringify(res.data.data));
            this.$router.push("home");
          } else {
            this.error = true;
            return false;
          }
        } else {
          this.error = true;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getVcode() {
      const { data } = await this.$request.get("/vcode");
      this.vcodeSvg = data.data.svg;
      // console.log(data.data.svg)
      localStorage.setItem("svg", data.data.text);
    },
  },
  created() {
    this.getVcode();
  },
};
</script>

<style lang="scss" scoped>
.login {
  h2 {
    text-align: center;
    color: #409eff;
    font-family: "Microsoft YaHei";
    font-weight: 500;
  }

  .header {
    padding-left: 100px;
    background-color: #fff;
    color: #409eff;
    font-family: "Microsoft YaHei";
    font-size: 30px;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: 0 0 2px #f1f1f1;

    .header {
      padding-left: 100px;
      background-color: #fff;
      color: #409eff;
      font-family: "Microsoft YaHei";
      font-size: 30px;
      border-bottom: 1px solid #f1f1f1;
      box-shadow: 0 0 2px #f1f1f1;
    }

    .log {
      width: 350px;
      margin: 0px auto;
      border: 1px solid #ccc;
      padding: 20px 50px 0 0;
    }

    .el-input-group__append .code {
      height: 38px;
      width: 70px;

      /deep/ svg {
        height: 40px;
        width: 70px;
      }
    }
  }
}
</style>