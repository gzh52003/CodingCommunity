const fs = require('fs')
const axios = require('axios')

let baseUrl = "https://apinew.juejin.im/recommend_api/v1/article/recommend_all_feed"
let resList = [];

async function fn() {
    let {data} = await axios.post(baseUrl, {
        client_type: 2608,
        cursor: "0",
        id_type: 2,
        limit: 100,
        sort_type: 200
    })
    let dataList = data.data;
    dataList.forEach(ele =>{
        let itemJson = JSON.stringify(ele);
        let item = JSON.parse(itemJson);
        resList.push(item);
    })
    let resJson = JSON.stringify(resList);
    let ws = fs.createWriteStream("./data.json")
    ws.write(resJson);
}
fn()