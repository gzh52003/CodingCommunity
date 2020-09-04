<template>
  <div id="app" style="height:100%">
    <el-container style="height:100%">
      <!-- 头部 -->
      <el-header class="head">
        <h2>后台管理系统</h2>
        <div>
          <el-link type="primary">登录</el-link>
          <el-link type="primary">注册</el-link>
        </div>
      </el-header>
      <el-container style="height:100%">
        <el-aside width="200px" style="height:100%">
          <!-- 左边aside -->
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="vertical"
            active-text-color="#ff0"
            background-color="#58bc58"
            @select="changeMenu"
            router
          >
            <template v-for="item in menu">
              <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
                <i :class="item.icon" style="color:#fff"></i>
                {{item.text}}
              </el-menu-item>
              <el-submenu :key="item.path" :index="item.path" v-else>
                <template v-slot:title>
                  <i :class="item.icon" style="color:#fff"></i>
                  {{item.text}}
                </template>
                <el-menu-item
                  :key="sub.path"
                  :index="item.path+sub.path"
                  v-for="sub in item.submenu"
                >{{sub.text}}</el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main style="padding:10px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">活动管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "App",

  data() {
    return {
      activeIndex: "/goods",
      menu: [
        {
          text: "商品列表",
          path: "/goods",
          icon: "el-icon-s-goods",
        },
        {
          text: "用户列表",
          path: "/userlist",
          icon: "el-icon-s-goods",
        },
        {
          text: "订单",
          path: "/order",
          icon: "el-icon-s-goods",
        },
      ],
      currentIndex: 0,
    };
  },

  components: {},
  methods: {
    changeMenu(path) {
      console.log(path);
      this.activeIndex = path;
    },
  },
};
</script>
<style>
body,
html {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.is-active {
  color: pink !important;
}
.head {
  display: flex;
  justify-content: space-between;
}
.head h2 {
  height: 100%;
  line-height: 60px;
  margin: 0;
  font-size: 24px;
}
</style>