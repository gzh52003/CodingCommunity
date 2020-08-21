<template>
  <el-table :data="commentList" :stripe="true" style="width: 100%">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column type="index" label="#" width="100"></el-table-column>
    <el-table-column prop="userName" label="用户名"></el-table-column>
    <el-table-column prop="comment_content" label="评论内容"></el-table-column>
    <el-table-column prop="ctime" label="评论时间"></el-table-column>
    <el-table-column prop="options" label="操作">
      <template v-slot:default="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="small"
          @click="gotoedit(scope.row._id)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="small"
          @click="remove(scope.row._id)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import getLocalTime from "../../utils/formatTime";
export default {
  data() {
    return {
      commentList: [],
    };
  },
  methods: {
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    },
  },
  created() {
    let commentList = [
      {
        comment_content:
          "Linux版本的nc是被阉割的，有一个参数不能用。要重新编译。还有一个工具也不错lcx，同样有win/lnx版本",
        comment_id: "6863202386459377672",
        comment_status: 1,
        ctime: 1597963838,
        userName: "小明",
      },
    ];
    commentList = commentList.map((item) => {
      item.ctime = getLocalTime(item.ctime);
      return item;
    });
    this.commentList = commentList;
  },
};
</script>