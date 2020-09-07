<template>
    <div>
        <van-nav-bar left-text="确认订单" left-arrow @click-left="onClickLeft" />

        <van-card :num="item.num" :price="item.pricecurrent" :title="item.title" :thumb="item.imgurl" :key="item._id"
            v-for="item in goodslist">
            <template #price>
                <p>
                    <span>￥{{item.pricecurrent}}</span>
                </p>
            </template>


        </van-card>





        <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="summary">
            <p>共{{goodsNum}}件</p>
        </van-submit-bar>
    </div>
</template>


<script>
    import Vue from 'vue';
    import {
        SubmitBar,
        NavBar
    } from 'vant';
    Vue.use(SubmitBar);
    Vue.use(NavBar);
    export default {
        name: 'Summary',
        data() {
            return {

            }
        },
        computed: {
            goodslist() {
                return this.$store.state.cart.goodslist.filter(item => item.checked)
            },
            totalPrice() {
                return this.goodslist.reduce((pre, item) => pre + item.pricecurrent * item.num, 0) * 100;

            },
            goodsNum() {
                return this.goodslist.reduce((pre, item) => {
                    return pre + item.num
                }, 0)
            }
        },
        methods: {
            onClickLeft() {
                this.$router.push('./cart')
            },
            summary() {

            }
        },
        created() {
            this.$store.commit('displayTabbar', false);
        },

        beforeDestroy() {
            this.$store.commit('displayTabbar', true);
        }

    }
</script>

<style lang="scss" scoped>
    /deep/ .van-nav-bar {
        .van-icon {
            color: #000;
            font-size: 22px;
        }

        .van-nav-bar__text {
            color: #000;
            font-size: 18px;
        }
    }
</style>