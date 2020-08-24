<template>
  <div>
    <el-table
      :data="commentList"
      :stripe="true"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="comment_content" label="评论内容"></el-table-column>
      <el-table-column prop="ctime" label="评论时间"></el-table-column>
      <el-table-column prop="options" label="操作">
        <template v-slot:default="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="remove(scope.row._id)"
            title="删除"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="position:relative; margin-bottom:100px">
      <el-button
        type="danger"
        v-if="multipleSelectionFlag"
        @click="popDelete"
        style="position:absolute;right:200px; top:30px"
      >批量删除</el-button>
    </div>
    <el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">
      <span>确定要删除{{removeCount}}条数据吗</span>
      <span slot="footer">
        <el-button type="primary" @click="multiDelete">确 定</el-button>
        <el-button @click="dialogVisible">取 消</el-button>
      </span>
    </el-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="pageNo"
      style="text-align:center; margin-top:10px"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
<script>
import getLocalTime from "../../utils/formatTime";
export default {
  data() {
    return {
      commentList: [],
      pageNo: 1,
      pageSize: 3,
      total: 0,
      multiDeleteVisible: false,
      multipleSelectionFlag: false,
      removeCount: 0,
      removeArr: [],
      idArr: [],
    };
  },
  methods: {
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    },
    dialogVisible() {
      this.multiDeleteVisible = false;
    },
    async changePage(pageNo) {
      this.pageNo = pageNo;
      let commentList = await this.$request.get(
        `/comment?pageNo=${pageNo}&pageSize=${this.pageSize}`
      );
      commentList = commentList.data.data;
      commentList = commentList.map((item) => {
        item.ctime = getLocalTime(item.ctime);
        return item;
      });
      this.commentList = commentList;
    },
    remove(id) {
      this.$confirm("确定删除这条评论吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const result = await this.$request.delete("/comment/" + id);
        if (result.data.code === 1001) {
          this.total--;
          if (
            this.total == (this.pageNo - 1) * this.pageSize &&
            this.total != 0
          ) {
            this.pageNo--;
            let commentList = await this.$request.get(
              `/comment?pageNo=${this.pageNo}&pageSize=${this.pageSize}`
            );
            commentList = commentList.data.data;
            commentList = commentList.map((item) => {
              item.ctime = getLocalTime(item.ctime);
              return item;
            });
            this.commentList = commentList;
          } else {
            this.commentList = this.commentList.filter(
              (item) => item._id !== id
            );
          }

          this.$message({
            type: "success",
            message: "成功移除一条数据",
          });
        }
      });
    },
    handleSelectionChange(val) {
      if (val.length !== 0) {
        this.multipleSelectionFlag = true;
      } else {
        this.multipleSelectionFlag = false;
      }
      this.removeCount = val.length;
      this.removeArr = [];
      val.forEach((item) => {
        this.removeArr.push(item);
      });
    },
    popDelete() {
      this.multiDeleteVisible = true;
    },
    async multiDelete() {
      this.removeArr.forEach((item) => {
        this.idArr.push(item._id);
      });
      const idStr = this.idArr.join();

      const result = await this.$request.delete(`/comment/${idStr}`);
      if (result.data.code === 1001) {
        this.multiDeleteVisible = false;
        this.multipleSelectionFlag = false;
        this.total = this.total - this.removeCount;
        if (
          (this.total == (this.pageNo - 1) * this.pageSize ||
            this.removeCount === this.pageSize) &&
          this.total !== 0
        ) {
          this.pageNo--;
          let commentList = await this.$request.get(
            `/comment?pageNo=${this.pageNo}&pageSize=${this.pageSize}`
          );
          commentList = commentList.data.data;
          commentList = commentList.map((item) => {
            item.ctime = getLocalTime(item.ctime);
            return item;
          });
          this.commentList = commentList;
        } else {
          this.commentList = this.commentList.filter((item) => {
            return !this.idArr.includes(item._id);
          });
        }
        this.idArr = [];
        this.$message({
          type: "success",
          message: "成功移除" + this.removeCount + "条数据",
        });
      }
    },
  },
  async created() {
    const result = await this.$request.get("/comment");
    this.total = result.data.data.length;

    let commentList = await this.$request.get(
      `/comment?pageNo=${this.pageNo}&pageSize=${this.pageSize}`
    );
    commentList = commentList.data.data;
    commentList = commentList.map((item) => {
      item.ctime = getLocalTime(item.ctime);
      return item;
    });
    this.commentList = commentList;
  },
};
</script>