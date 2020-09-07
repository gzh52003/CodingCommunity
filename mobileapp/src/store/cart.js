
const cart = {
    state: {
        goodslist: [{
            "_id": "5f50a77879a637ba8e5abe70",
            "goodsid": "192441894",
            "pricecurrent": "59.9",
            "priceold": "198",
            "title": "显龄背带牛仔裤显瘦",
            "imgurl": "./img/1.jpg",
            "sold": "剩1天",
            "num": 3,
            "checked": false,

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
            "checked": false,

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
            "checked": false,
        }
        ]
    },
    getters: {
        totalPrice(state) {
            return state.goodslist.filter(item => {
                return item.checked
            }).reduce((pre, cur) => {
                return pre + cur.pricecurrent * cur.num * 100
            }, 0)
            // return state.goodslist.reduce((pre, item) => pre + item.pricecurrent * item.num, 0) * 100;

        },

    },
    mutations: {
        // 删除商品
        remove(state) {
            state.goodslist = state.goodslist.filter(item => !item.checked)

        },

        //  全选
        allcheck(state, check) {
            state.goodslist.forEach(item => {
                item.checked = check
            })
        },

    },
    actions: {},
}


export default cart;