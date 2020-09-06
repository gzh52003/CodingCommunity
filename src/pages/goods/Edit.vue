<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="商品名" prop="three_subtit">
        <el-input type="text" v-model="ruleForm.three_subtit"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input type="text" v-model.number="ruleForm.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="tag">
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
        <el-input type="text" v-model.number="ruleForm.rest" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="imgUrl"></el-form-item>
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
      goodsId: "",
      value: "",
      options: [
        { value: "foods", label: "美食" },
        { value: "living", label: "家居" },
        { value: "cook", label: "厨具" },
        { value: "clothes", label: "服装" },
        { value: "beauty", label: "护肤" },
      ],
      ruleForm: {
        three_subtit: "",
        price: "",
        rest: "",
        tag: "",
        imgUrl:
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
      },
      rules: {
        three_subtit: [
          {
            min: 1,
            max: 15,
            message: "请输入 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        rest: [
          { required: true, message: "请输入库存", trigger: "blur" },
          {
            type: "number",
            message: "必须输入数字",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          {
            type: "number",
            message: "必须输入数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async selected() {
      this.ruleForm.tag = this.value;
    },
    classification(item) {
      switch (item.tag) {
        case "foods":
          item.tag = "美食";
          break;
        case "living":
          item.tag = "家居";
          break;
        case "cook":
          item.tag = "厨具";
          break;
        case "clothes":
          item.tag = "服装";
          break;
        case "beauty":
          item.tag = "护肤";
          break;
      }
      return item;
    },
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          const { goodsId, ruleForm } = this;
          let data;
          if (goodsId) {
            data = await this.$request.put("/goods/" + goodsId, {
              ...ruleForm,
            });
            data = data.data;
          } else {
            data = await this.$request.post("/goods/add", {
              ...ruleForm,
            });
            data = data.data;
          }
          if (data.code === 1001) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.$router.push("/goods/list");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {
    "$route.path"(newVal) {
      if (newVal === "/goods/add") {
        this.ruleForm = {
          three_subtit: "",
          price: "",
          rest: "",
          tag: "",
        };
        this.goodsId = "";
        this.value = "";
      }
    },
  },
  async created() {
    const { id } = this.$route.params;
    this.goodsId = id;
    const result = await this.$request.get("/goods/" + id);
    const { data } = result.data;
    const goodsData = this.classification(data[0]);
    Object.assign(this.ruleForm, goodsData);
    this.value = this.ruleForm.tag;
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