<template>
  <div>
    <router-view />
  </div>
</template>
<script>
  export default {
    name: "App",
  };
</script>

<style lang="scss" scoped>
  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
  }

  .header {
    line-height: 60px;
    color: #fff;
    background-color: rgba(84, 92, 100, 0.9);

    .logo {
      font-size: 24px;
      color: #fc0;

      i {
        font-size: 40px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }

  .is-active {
    i {
      color: inherit !important;
    }
  }
</style>