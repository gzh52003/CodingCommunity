const {
    MongoClient,
} = require('mongodb')
const fs = require("fs")
const url = 'mongodb://localhost:27017';
const dbname = 'community';

async function connect() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbname);
    return {
        client,
        db,
    }
}
async function insert(colName, query) {
    const {
        client,
        db
    } = await connect();
    const collection = db.collection(colName);
    // 添加一条数据只能用insetOne
    const result = await collection[query instanceof Array ? "insertMany" : "insertOne"](query);
    client.close();

    return result;
}
fs.readFile("./genData.json",'utf8',async (err,data)=>{
    if(err){
        console.log(err)
    }else{
        let dataList = JSON.parse(data);
        await insert("blogs", dataList);
    }
})