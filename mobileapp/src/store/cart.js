const cart = {
    state: {
        goodslist: [
            // {
            //     comment: 3,
            //     imgUrl: "http://www.coman.icu/img/beauty/2.jpg",
            //     price: 199,
            //     rest: 22,
            //     tag: "beauty",
            //     three_subtit: "日本蜜梨薏仁水精选套装",
            //     total: 1,
            //     _id: "5f54f86f3a8e61c5bceb294e",
            //     checked:false
            // }
        ]
    },
    getters: {
        totalPrice(state) {
            return state.goodslist.filter(item => {
                return item.checked
            }).reduce((pre, cur) => {
                return pre + cur.price * cur.total * 100
            }, 0)
            // return state.goodslist.reduce((pre, item) => pre + item.pricecurrent * item.num, 0) * 100;
        },

    },
    mutations: {
        //清空购物车缓存
        clearTrolley(state){
            state.goodslist = [];
        },
        //更新购物车商品列表
        updateTrolley(state, payload) {
            //payload接收一个静态副本
            state.goodslist = payload
        },
        // 删除商品
        remove(state) {
            state.goodslist = state.goodslist.filter(item => !item.checked)

        },
        //更改单个check
        singleCheck(state, payload) {
            state.goodslist = state.goodslist.map(item => {
                if (item._id == payload) {
                    item.checked = !item.checked;
                }
                return item
            })
        },
        //  全选
        allcheck(state, payload) {
            state.goodslist = state.goodslist.map(item => {
                item.checked = payload
                return item
            })
        },

    },
    actions: {
        // detailInsertTrolley(context,payload){
        //     return new Promise((resolve,reject)=>{
        //         //let res = await 

        //         console.log("商品列表副本",curTrolley);
        //         this.commit("setCurrentTrolley",context)
        //         this.commit("trolleyInsert",context.rootState.current.goodsInfo)
        //         console.log("action",context,payload);
        //         resolve("action执行成功")
        //     })
        // }
    },
}


export default cart;