<template>
  <div class="login">
    <el-container>
      <el-header class="header">掘金社区</el-header>
    </el-container>
    <h2>欢迎登录</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm log"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">免费注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else {
        if (this.ruleForm.checkName !== "") {
          this.$refs.ruleForm.validateField("checkName");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        pass: "",

        name: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],

        name: [
          { validator: checkName, trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
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