<template>
  <div id="app">
    <router-link to="/manage/" id="nav" >后台管理系统</router-link>
    <!-- <router-view/> -->
  <Index/>
    
  </div>
</template>
<script>
import Index from './pages/manage/Index.vue'
export default {
  data() {
    return {
    }
  },
  methods:{
  
    
  },
  components:{
    Index
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
