
<template>
  <el-table :data="userlist" stripe style="width: 100%">
    <el-table-column prop="id" label="#" width="100"></el-table-column>
     <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="age" label="职位"  width="180"></el-table-column>
   <el-table-column prop="age" label="公司"  width="180"></el-table-column>
    <el-table-column prop="address" label="操作">
      <template>
        <el-button type="danger" >禁止登录</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  methods:{

  },
async created(){
  const { data } = await this.$request.get("/user");
    console.log(data.data[0].data);
    this.userlist = data.data[0].data;
    console.log(this.userlist[0].author_user_info)
}
  

}

</script>

<style>

</style>

