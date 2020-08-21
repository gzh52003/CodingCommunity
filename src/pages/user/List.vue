<template>
  <div>
    <el-table ref="multipleTable" :data="userlist" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="55"></el-table-column>
      <el-table-column label="用户名" width="150" prop="item_info.author_user_info.user_name"></el-table-column>
      <el-table-column prop="item_info.author_user_info.job_title" label="职位" width="200"></el-table-column>
      <el-table-column
        prop="item_info.author_user_info.company"
        label="公司"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="120">
        <!-- 需要获取数据id -->
        <!-- <slot name="title"></slot>
        <slot :row="item"/>-->
        <template v-slot:default="scope">
          <el-button
            size="small"
            plain
            type="success"
            icon="el-icon-edit"
            circle
            @click="goto(scope.row._id)"
          ></el-button>

          <el-button
            size="small"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteUser(scope.row._id)"
          ></el-button>
        </template>
       
      </el-table-column>
    </el-table>
     <el-pagination  background layout="prev, pager, next" :total="30" @click='page()' style="text-align:center"></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      currentId: "",
    };
  },
  methods: {
    async deleteUser(id) {
      this.$confirm("你确认要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/user/" + id);

        if (data.code === 1) {
          this.userlist = this.userlist.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    goto(id) {
      // 跳转路由传参
      //   this.$router.push("/user/edit/"+id + '?a=10');
      this.$router.push({
        name: "userEdit",
        params: { id },
        query: {
          a: 10,
          b: 20,
        },
      });
    },
  },
  async created() {
    console.log("List=", this);
    // axios({
    //     url:'http://localhost:2003/api/user',
    //     method:'get',
    //
    // })
    const { data } = await this.$request.get("/");
    console.log(data.data[0].data);

    this.userlist = data.data[0].data;
    this.userlist = this.userlist.filter((item) => {
      // console.log(item.item_info.author_user_info)
      return item.item_info.author_user_info !== undefined;
    });
    console.log(this.userlist);
  },
};
</script>