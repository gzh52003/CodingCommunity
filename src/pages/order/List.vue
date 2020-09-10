<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="selected">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-table
      :data="orderlist"
      :stripe="true"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column el-link type="success" prop="_id" label="订单编号" class="orderId"></el-table-column>
      <el-table-column prop="total" label="订单价格"  >
      </el-table-column>
      <el-table-column prop="status" label="是否发货">
         <template slot-scope="scope">
              <el-button size="mini" type="danger" plain v-if = "scope.row.buttonVisible" @click = "changeTable(scope.row._id)">未发货</el-button>
              <el-button size="mini" type="primary" plain v-else @click = "changeTable(scope.row._id)">已发货</el-button>
            </template>
      </el-table-column>
      <el-table-column prop="createTime" label="下单时间"></el-table-column>
      <el-table-column prop="options" label="操作">
        <template v-slot:default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            @click="edit(scope.row._id)"
            title="修改"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="remove(scope.row._id)"
            title="删除"
          ></el-button>
           <el-button size="mini" type="primary" plain @click="orderDetail(scope.row._id)">订单详情</el-button>
          <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column property="userName" label="用户名" width="150"></el-table-column>
               <el-table-column property="total" label="总价" width="200"></el-table-column>
              <el-table-column  label="商品信息" width="300" type='expand'>
                 <template slot-scope="scope">
                    <el-table :data="scope.row.goodsList" width='100%' class="two-list">
                        <el-table-column prop="three_subtit" label="商品名"></el-table-column>
                        <el-table-column prop="total" label="数量"></el-table-column>
                    </el-table>
                 </template>
              </el-table-column>
              
            </el-table>
          </el-dialog>
  
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
import getLocalTime from '../../utils/formatTime'
export default {
  data() {
    return {
      options: [
        { value: "all", label: "全部" },
        { value: 5, label: "每页5条" },
        { value: 10, label: "每页10条" },
      ],
      dialogTableVisible : false,
      orderlist: [],
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
      gridData:[]
    };
  },
  methods: {
   async orderDetail(id){
     this.dialogTableVisible = true
     let obj ={}
     const result =await this.$request.get('/order/detail/'+id);
     const {data} = result.data
     const dataList = data[0];
      obj.userName = (dataList.userId)[0].username;
     let goodsList = dataList.queryList;
     obj.goodsList = goodsList;
     obj.total = dataList.total;
     this.gridData = [];
     this.gridData.push(obj)
    console.log(this.gridData);
   },
   async changeTable(id){
     console.log(this.$event);
      const result = await this.$request.put(`/order/changeStatus/${id}`);
      const {code} = result.data;
      if(code===1001){
        this.orderlist = this.orderlist.map(item=>{
          if(item._id===id){
           item.buttonVisible = !item.buttonVisible
          }
          return item
        })
         this.$message({
            type: "success",
            message: "操作成功",
          });
      }
    },
    dialogVisible() {
      this.multiDeleteVisible = false;
    },
    // 传入的值为真则返回所有数据
    async getorderlist(all = false) {
      let result;
      if (all) {
        result = await this.$request.get("/order");
        let { data } = result.data;
        data = data.map(item=>{
          item.createTime = getLocalTime(item.createTime);
        if(item.status===0){
                  item.buttonVisible = true
          }else{
            item.buttonVisible = false
          }
          return item
        })
        console.log(data);
        return data;
      } else {
        result = await this.$request.get(
          `/order?pageNo=${this.pageNo}&pageSize=${this.pageSize}`
        );
        let { data } = result.data;
      data = data.map(item=>{
          item.createTime = getLocalTime(item.createTime);
          if(item.status===0){
            item.buttonVisible = true
          }else{
            item.buttonVisible = false
          }
          return item
        })
        return data;
      }
    },
    async selected() {
      if (this.value === "all") {
        this.showPage = false;
        this.orderlist = await this.getorderlist(true);
      } else {
        this.showPage = true;
        this.pageSize = this.value;
        this.pageNo = 1;
        this.orderlist = await this.getorderlist();
      }
    },
    async changePage(pageNo) {
      this.pageNo = pageNo;
      this.orderlist = await this.getorderlist();
    },
    remove(id) {
      this.$confirm("确定删除这条订单吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const result = await this.$request.delete("/order/" + id);
        if (result.data.code === 1001) {
          this.total--;
          if (
            this.total == (this.pageNo - 1) * this.pageSize &&
            this.total != 0
          ) {
            this.pageNo--;
            this.orderlist = await this.getorderlist();
          } else {
            this.orderlist = this.orderlist.filter((item) => item._id !== id);
          }
          this.$message({
            type: "success",
            message: "成功移除一条数据",
          });
        }
      });
    },
    edit(id) {
      this.$router.push("/order/edit/" + id);
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

      const result = await this.$request.delete(`/order/${idStr}`);
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
          this.orderlist = await this.getorderlist();
        } else {
          this.orderlist = this.orderlist.filter((item) => {
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
    const data = await this.getorderlist(true);

    this.total = data.length;

    this.orderlist = await this.getorderlist();
  },
};
</script>
<style scoped>

</style>