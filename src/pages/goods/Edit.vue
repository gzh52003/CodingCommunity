<template>
  <div>
    <h1>商品编辑</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="商品名" prop="three_subtit">
        <el-input type="text" v-bind:value="ruleForm.three_subtit"></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <el-input type="text" v-model="ruleForm.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-select v-model="value" placeholder="请选择" @change="selected">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存" prop="rest">
        <el-input type="text" v-model="ruleForm.rest" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="submitForm">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      options: [],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      ruleForm: {
        avatar_large: "",
        company: "",
        description: "",
        job_title: "",
        user_name: "",
      },
      rules: {
        company: [
          {
            min: 1,
            max: 15,
            message: "请输入 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        description: [
          {
            max: 60,
            message: "允许输入最多60个字符",
            trigger: "blur",
          },
        ],
        job_title: [
          {
            min: 2,
            max: 12,
            message: "请 2 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        console.log(13, valid);
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          const { userid, ruleForm } = this;
          const { data } = await this.$request.put("/user/" + userid, {
            ...ruleForm,
          });
          if (data.code === 1001) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.$router.push("../");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  async created() {
    // console.log("Router=", this.$router);
    console.log("Route=", this.$route);
    //const {a,b} = this.$route.query;
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/user/" + id);

    const userdata = data.data[0]; //{一个对象}
    console.log(userdata);
    this.userid = id;
    console.log(this.userid);
    // const o = {avatar_large:111}
    //this.ruleForm是目标对象，把userdata这个对象整合到this.ruleForm里
    Object.assign(this.ruleForm, userdata);

    console.log(this.ruleForm);
  },
};
</script>
<style >
.el-input {
  width: 300px !important;
}
.demo-type {
  position: absolute;
  top: 0;
  right: 300px;
}
.el-form {
  position: relative;
}
</style>