<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="sub-title">ID:</div>
        <el-input v-model="BlogsID" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="8">
        <div class="sub-title">作者:</div>
        <el-input v-model="author" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="8">
        <div class="sub-title">标题:</div>
        <el-input v-model="title" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="sub-title">标签:</div>
        <el-autocomplete
          class="inline-input"
          v-model="tag"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tagList: [],
      BlogsID: "",
      author: "",
      title: "",
      tag: "",
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var tagList = this.tagList;
      var results = queryString
        ? tagList.filter(this.createFilter(queryString))
        : tagList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (tags) => {
        return (
          tags.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [
        { value: "HTML" },
        { value: "HTML5" },
        { value: "CSS" },
        { value: "CSS3" },
        { value: "JavaScript" },
        { value: "js" },
        { value: "jQuery" },
        { value: "node.js" },
        { value: "ajax" },
        { value: "gulp" },
        { value: "PHP" },
        { value: "git" },
        { value: "express" },
        { value: "scss" },
        { value: "sass" },
        { value: "MySQL" },
        { value: "mongodb" },
        { value: "svg" },
        { value: "ElementUI" },
        { value: "bootstrap" },
        { value: "vue.js" },
        { value: "vue-cli" },
        { value: "vue-router" },
        { value: "vuex" },
        { value: "websocket" },
        { value: "multer" },
        { value: "eslint" },
        { value: "babel" },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
  },
  mounted() {
    this.tagList = this.loadAll();
  },
};
</script>
<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  line-height: 40px;
  text-align: center;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.sub-title {
  display: inline-block;
  margin-right: 6px;
}
.el-col>.el-input {
width: 70% ;
}
.el-button{
  float: left;
}
</style>