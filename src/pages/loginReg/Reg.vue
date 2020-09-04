<template>
  <div class="login">
    <el-container>
      <el-header class="header">掘金社区</el-header>
    </el-container>
    <h2>免费注册</h2>
    <el-row type="flex" justify="center">
      <el-form
        class="log"
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="80px"
        @keyup.enter.native="register(formData)"
      >
        <el-form-item prop="userName" label="用户名">
          <el-input
            v-model="formData.userName"
            placeholder="请输入用户名"
            prefix-icon="icon-login_user"
            clearable
            @blur="query()"
          ></el-input>
          <el-alert title="用户名已存在，请更换" type="error" v-if="arrs" show-icon></el-alert>
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
        <el-form-item prop="cheackPassword" label="确认密码">
          <el-input
            v-model="formData.cheackPassword"
            placeholder="再次输入密码"
            type="password"
            prefix-icon="icon-login_pwd"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            size="small"
            type="primary"
            @click="register(formData)"
            icon="el-icon-upload"
          >注册</el-button>
          <el-button size="small" @click="resetForm('formData')">重置</el-button>
        </el-form-item>

        <router-link to="login" style="color:red">已有账号？欢迎登录</router-link>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      formData: {
        userName: "",
        password: "",
        cheackPassword: "",
      },
      arrs: false,
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
        cheackPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    register(formData) {
      this.$refs["formData"].validate(async (valid) => {
        if (valid && !this.arrs) {
          let res = await this.$request.post("reg", {
            username: formData["userName"],
            password: formData["password"],
            cheackPassword: formData["cheackPassword"],
          });
          console.log(res);
          if (res.data.code === 1) {
            this.$message({
              type: "success",
              message: "注册成功",
            });
            this.$router.push("");
            console.log("zhengque", formData);
          } else {
            console.log("网络错误");
            return false;
          }
        } else {
          console.log("用户输入的格式错误或账号已存在", formData);
          return false;
        }
      });

      // console.log(res);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询用户是否被占用
    async query() {
      console.log(111);
      let { data } = await this.$request.get("reg/check", {
        params: {
          userName: this.formData.userName,
        },
      });
      console.log("res=", data);
      if (data.code === 0) {
        this.arrs = true;
      } else {
        this.arrs = false;
      }
    },
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
  }

  .log {
    width: 350px;
    margin: 0px auto;
    border: 1px solid #ccc;
    padding: 20px 50px 0 20px !important;
  }
}
</style>