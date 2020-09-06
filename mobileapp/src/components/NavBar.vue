<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <template #title>{{title}}</template>
      <slot name="act"></slot>
    </van-nav-bar>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar } from "vant";

Vue.use(NavBar);
export default {
  data() {
    return {};
  },
  props: ["title"],
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>