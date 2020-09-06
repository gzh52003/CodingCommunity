<template>
  <div class="wrap">
    <el-select v-model="value" filterable placeholder="请选择" class="select" @change="changeSel">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-table ref="multipleTable" :data="orderlist" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="55"></el-table-column>
      <el-table-column label="用户名" width="150" prop="user_name"></el-table-column>
      <el-table-column prop="job_title" label="职位" width="200"></el-table-column>
      <el-table-column prop="company" label="公司" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="描述" width="200"></el-table-column>
      <el-table-column label="操作" width="180">
        <!-- 需要获取数据id -->
        <!-- <slot name="title"></slot>
        <slot :row="item"/>-->
        <template v-slot:default="scope">
          <el-button size="small" plain type="success" title="编辑" @click="goto(scope.row._id)">编辑</el-button>

          <el-button
            size="small"
            plain
            type="danger"
            title="删除该用户"
            @click="deleteUser(scope.row._id)"
          >删除</el-button>

          <!--  -->
          <el-button
            v-show="scope.row.status===1"
            size="small"
            plain
            type="warning"
            title="未发货"
            @click="stopLogin(scope.row._id,$event)"
          >{{stop}}</el-button>
          <el-button
            v-show="scope.row.status===0"
            size="small"
            plain
            type="primary"
            title="已发货"
            @click="allowLogin(scope.row._id,$event)"
          >{{allow}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="pageNo"
      :total="total"
      @current-change="changePage"
      style="text-align:center"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderlist: [],
      currentId: "",
      stop: "禁用",
      allow: "启用",
      pageSize: 5,
      total: 0,
      pageNo: 1,
      options: [
        {
          value: "选项1",
          label: "显示全部",
        },
        {
          value: "选项2",
          label: "显示已禁用",
        },
        {
          value: "选项3",
          label: "显示已启用",
        },
      ],
      value: "选项1",
    };
  },
  methods: {
    // 传入的值为真则返回所有数据
    async getOrdersList(all = false) {
      let result;
      if (all) {
        result = await this.$request.get("/order");
        let { data } = result.data;
        return data;
      } else {
        result = await this.$request.get(
          `/order?pageNo=${this.pageNo}&pageSize=${this.pageSize}`
        );
        let { data } = result.data;
        return data;
      }
    },
    async changeSel() {
      if (this.value === "选项1") {
        this.pageNo = 1;
        const total = await this.$request.get("/user");
        this.total = total.data.data.length;
        const { data } = await this.$request.get(
          "/user?pageNo=" + this.pageNo + "&pageSize=" + this.pageSize
        );

        this.orderlist = data.data;
      }

      console.log(this.value);
      if (this.value === "选项2") {
        this.pageNo = 1;
        const total = await this.$request.get("/user?status=0");
        this.total = total.data.data.length;
        const { data } = await this.$request.get(
          "/user?pageNo=" +
            this.pageNo +
            "&pageSize=" +
            this.pageSize +
            "&status=0"
        );

        this.orderlist = data.data;
        // this.orderlist = this.orderlist.filter(item=>{
        //   return item.status === 0
        // })
        // this.total = this.orderlist.length;
      }
      if (this.value === "选项3") {
        this.pageNo = 1;
        const total = await this.$request.get("/user?status=1");
        this.total = total.data.data.length;
        const { data } = await this.$request.get(
          "/user?pageNo=" +
            this.pageNo +
            "&pageSize=" +
            this.pageSize +
            "&status=1"
        );
        this.orderlist = data.data;
        // this.orderlist = this.orderlist.filter(item=>{
        //   return item.status === 1
        // })
        //  this.total = this.orderlist.length;
      }
    },
    async changePage(pageNo) {
      // console.log(pageNo);
      this.pageNo = pageNo;
      if (this.value === "选项1") {
        const total = await this.$request.get("/user");
        this.total = total.data.data.length;

        const { data } = await this.$request.get(
          "/user?pageNo=" + this.pageNo + "&pageSize=" + this.pageSize
        );
        this.orderlist = data.data;
      }

      if (this.value === "选项2") {
        // this.pageNo = 1

        const { data } = await this.$request.get(
          "/user?pageNo=" +
            this.pageNo +
            "&pageSize=" +
            this.pageSize +
            "&status=0"
        );
        this.orderlist = data.data;
        // this.orderlist = this.orderlist.filter((item) => {
        //   return item.status === 0;
        // });
      }
      if (this.value === "选项3") {
        // this.pageNo = 1
        const { data } = await this.$request.get(
          "/user?pageNo=" +
            this.pageNo +
            "&pageSize=" +
            this.pageSize +
            "&status=1"
        );
        this.orderlist = data.data;
        // this.orderlist = this.orderlist.filter((item) => {
        //   return item.status === 1;
        // });
      }
    },
    async deleteUser(id) {
      this.$confirm("你确认要删除该用户吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/user/" + id);

        if (data.msg === "success") {
          this.orderlist = this.orderlist.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    stopLogin(id) {
      //console.log(id);
      this.$confirm("你确认要禁用这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.put("/user/changeStatus/" + id);

        if (data.msg === "success") {
          this.$message({
            type: "success",
            message: "禁用成功!",
          });
          const { data } = await this.$request.get(
            "/user?pageNo=" + this.pageNo + "&pageSize=" + this.pageSize
          );
          this.orderlist = data.data;
        }

        // this.orderlist = this.orderlist.map((item) => {
        //   if (item.status === 0) {
        //     console.log(event);
        //     event.target.style.display = "none";
        //     event.target.parentElement.style.display = "none";
        //     event.target.parentElement.nextElementSibling.style.display = "inline-block";
        //      event.target.parentElement.previousElementSibling.firstElementChild.style.display = "inline-block";
        //   }
        //   return item;
        // });
      });
    },

    allowLogin(id) {
      console.log(id);
      this.$confirm("你确认要启用这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.put("/user/changeStatus/" + id);

        if (data.msg === "success") {
          this.$message({
            type: "success",
            message: "启动成功!",
          });
          const { data } = await this.$request.get(
            "/user?pageNo=" + this.pageNo + "&pageSize=" + this.pageSize
          );
          this.orderlist = data.data;
        }

        // this.orderlist = this.orderlist.map((item) => {
        //   if (item.status === 0) {
        //     console.log(event.currentTarget);
        //     console.log(this.status1, item.status);
        //     event.target.style.display = "none";
        //     event.target.parentElement.style.display = "none";
        //     event.target.parentElement.previousElementSibling.style.display = "inline-block";
        //     event.target.parentElement.previousElementSibling.firstElementChild.style.display = "inline-block";
        //   }
        //   return item;
        // });
      });
    },

    goto(id) {
      // 跳转路由传参
      this.$router.push("/user/edit/" + id);
      // this.$router.push({
      //   name: "userEdit",
      //   params: { id },
      //   query: {
      //     a: 10,
      //     b: 20,
      //   },
      // });
    },
  },
  async created() {
    const data = await this.getOrdersList(true);
    this.total = data.length;
    this.orderlist = await this.getOrdersList();
    for (let i = 0; i < this.orderlist.length; i++) {
      let item = this.orderlist[i];
      let userItem = await this.$request.get(`/user/${item.userId}`);
      this.orderlist[i].userId = userItem.data.data[0].username;
      this.orderlist[i].goodsList = this.orderlist[i].goodsList
        .substring(1, this.orderlist[i].goodsList.length - 1)
        .split(",");
      this.orderlist[i].goodsList = this.orderlist[i].goodsList.map((item) => {
        return {
          goodsId: item.substring(1, item.length - 1).split(":")[0],
          goodsTotal: item.substring(1, item.length - 1).split(":")[1],
        };
      });
      this.orderlist[i].goodsItems = [];
      this.orderlist[i].goodsList.forEach(async (item) => {
        let res = await this.$request.get("/goods/" + item.goodsId);

        this.orderlist[i].goodsItems.push(res.data.data[0]);
      });
    }

    console.log("ss", this.orderlist);
  },
};
</script>

<style scoped>
.el-button {
  margin-left: -4px !important;
}
.select {
  position: relative;
  /* right: 0px; */
  transform: translateX(804px);
}
.select .el-input__inner {
  width: 250px !important;
}
.select .el-input {
  width: 250px !important;
}
</style>