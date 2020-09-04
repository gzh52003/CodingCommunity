<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="selected">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-table
      :data="goodsList"
      :stripe="true"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="three_subtit" label="商品名"></el-table-column>
      <el-table-column prop="tag" label="分类"></el-table-column>
      <el-table-column prop="imgUrl" label="商品图片">
        <template v-slot:default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="rest" label="库存"></el-table-column>
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
      v-if="showPage"
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
export default {
  data() {
    return {
      options: [
        { value: "all", label: "全部" },
        { value: 5, label: "每页5条" },
        { value: 10, label: "每页10条" },
      ],
      goodsList: [],
      pageNo: 1,
      pageSize: 5,
      total: 0,
      multiDeleteVisible: false,
      multipleSelectionFlag: false,
      removeCount: 0,
      removeArr: [],
      idArr: [],
      value: 5,
      showPage: true,
    };
  },
  methods: {
    dialogVisible() {
      this.multiDeleteVisible = false;
    },
    classification(data) {
      return (data = data.map((item) => {
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
      }));
    },
    // 传入的值为真则返回所有数据
    async getGoodsList(all = false) {
      let result;
      if (all) {
        result = await this.$request.get("/goods");
        let { data } = result.data;
        data = this.classification(data);
        return data;
      } else {
        result = await this.$request.get(
          `/goods?pageNo=${this.pageNo}&pageSize=${this.pageSize}`
        );
        let { data } = result.data;
        data = this.classification(data);
        console.log(data);
        console.log(data);
        return data;
      }
    },
    async selected() {
      if (this.value === "all") {
        this.showPage = false;
        this.goodsList = await this.getGoodsList(true);
      } else {
        this.showPage = true;
        this.pageSize = this.value;
        this.pageNo = 1;
        this.goodsList = await this.getGoodsList();
      }
    },
    async changePage(pageNo) {
      this.pageNo = pageNo;
      this.goodsList = await this.getGoodsList();
    },
    remove(id) {
      console.log(id);
      this.$confirm("确定删除这条评论吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const result = await this.$request.delete("/goods/" + id);
        if (result.data.code === 1001) {
          this.total--;
          if (
            this.total == (this.pageNo - 1) * this.pageSize &&
            this.total != 0
          ) {
            this.pageNo--;
            this.goodsList = await this.getGoodsList();
          } else {
            this.goodsList = this.goodsList.filter((item) => item._id !== id);
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

      const result = await this.$request.delete(`/goods/${idStr}`);
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
          this.goodsList = await this.getGoodsList();
        } else {
          this.goodsList = this.goodsList.filter((item) => {
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
    const data = await this.getGoodsList(true);
    this.total = data.length;
    this.goodsList = await this.getGoodsList();
  },
};
</script>