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

        <el-form-item>
          <el-button
            size="small"
            type="primary"
            class="btn"
            @click="login('formData')"
            icon="el-icon-upload"
          >登录</el-button>
          <el-button size="small" @click="resetForm('formData')">重置</el-button>
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
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: "success",
            message: "登录成功",
          });
          this.$router.push({ name: "home" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">
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
    padding: 20px 50px 0 0;
  }
}
</style>