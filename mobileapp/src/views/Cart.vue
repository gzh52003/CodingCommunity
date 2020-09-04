<template>
    <div>
        <!-- 头部 -->
        <van-sticky>
            <h1>购物车 </h1>
            <p @click="change">编辑
                <span v-show="changesuccess">完成</span>
                <van-icon name="chat-o" />
            </p>
        </van-sticky>


        <!-- 商品订单 -->

        <van-card :num="item.num" :price="item.pricecurrent" :title="item.title" :thumb="item.imgurl" :key="item._id"
            v-for="item in goodslist" @click="gotoDetail($event,item._id)">
            <template #tag>
                <van-checkbox v-model="item.checked"></van-checkbox>
            </template>
            <template #price>
                <p>
                    <span>￥{{item.pricecurrent}}</span>
                    <van-stepper v-model="item.num" input-width="20px" button-size="20px" />
                </p>
            </template>

        </van-card>

        <!-- 提交订单 -->


        <template>
            <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
                <van-checkbox v-model="check">全选</van-checkbox>
                <template #tip>
                    你的收货地址不支持同城送, <span>修改地址</span>
                </template>
            </van-submit-bar>
        </template>

    </div>
</template>


<script>
    import Vue from 'vue';
    import {
        Sticky,
        Tab,
        Tabs,
        Card,
        Icon,
        SubmitBar,
        Stepper,


    } from 'vant';

    Vue.use(Sticky);
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Card);
    Vue.use(Icon);
    Vue.use(SubmitBar);
    Vue.use(Stepper);



    export default {
        name: 'Cart',
        data() {
            return {
                changesuccess: false,
                goodslist: [{
                        "_id": "5f50a77879a637ba8e5abe70",
                        "goodsid": "192441894",
                        "pricecurrent": "59.9",
                        "priceold": "198",
                        "title": "显龄背带牛仔裤显瘦",
                        "imgurl": "./img/1.jpg",
                        "sold": "剩1天",
                        "num": 3,
                        "checked": false
                    },
                    {
                        "_id": "5f50a77879a637ba8e5abe73",
                        "goodsid": "182441891",
                        "pricecurrent": "49.9",
                        "priceold": "189",
                        "title": "开叉泫雅风牛仔拖地裤",
                        "imgurl": "./img/2.jpg",
                        "sold": "剩1天",
                        "num": 1,
                        "checked": false
                    },
                    {
                        "_id": "5f50a77879a637ba8e5abe76",
                        "goodsid": "102440796",
                        "pricecurrent": "49.9",
                        "priceold": "2190",
                        "title": "网红短裤显高牛仔外套",
                        "imgurl": "./img/0.jpg",
                        "sold": "剩1天",
                        "num": 2,
                        "checked": false
                    }
                ]
            }
        },
        computed: {

            check: {
                get() {
                    return this.goodslist.every(item => item.checked)
                },
                set(val) {
                    this.goodslist = this.goodslist.map(item => {
                        item.checked = val;
                        return item;
                    })
                }
            },
            totalPrice() {
                return this.goodslist.reduce((pre, item) => pre + item.pricecurrent * item.num, 0) * 100;
            },

        },
        methods: {
            onSubmit() {

            },
            change() {

                this.changesuccess = true;

                console.log(111)
            },
            gotoDetail(e, id) {
                if (e.target.tagName === "IMG") {
                    this.$router.push('/goods/' + id);
                }
            },
        },
        mounted() {
            console.log(this.$router);
        }
    }
</script>

<style lang="scss" scoped>
    //头部
    /deep/.van-sticky {
        height: 50px;
        background: orangered;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        color: #fff;

        h1 {
            font-size: 20px;
        }

        p {
            font-size: 16px;
        }
    }

    // 商品
    .van-image {
        left: 30px;
    }

    .van-card__title {
        font-size: 14px;
        margin-top: 6px;
        font-weight: 600;
        position: absolute;
        left: 30px;
    }

    .van-card__price {
        color: red;
        font-weight: 600;
        position: absolute;
        left: 30px;
        top: 34px;
        font-size: 16px;

    }
</style>