const {
    MongoClient,
    ObjectId
} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbname = 'community';

async function connect() {
    const client = await MongoClient.connect(url, {
        useUnifiedTopology: true
    });
    const db = client.db(dbname);
    return {
        client,
        db,

    }
}


// 查找
async function find(colName, query, options) {
    query = query || {};
    options = options || {};

    const {
        client,
        db
    } = await connect();
    if (query._id) {
        query._id = ObjectId(query._id);
    }
    const opt = {};
    if (options.field) {
        opt.projection = options.field;
    }
    // 选择对应的集合
    const collection = db.collection(colName);

    // 这里有回调函数
    let result = collection.find(query, opt);

    if (options.sort) {
        let sort = options.sort;

        sort = sort.split(",");
        let key = sort[0];
        let val;
        if (sort.length > 1) {
            val = sort[1] * 1;
        } else {
            val = -1;
        }
        result = result.sort({
            [key]: val
        })
    }

    if (options.skip) {
        result = result.skip(options.skip);
    }

    if (options.pagesize) {
        result = result.limit(options.pagesize);
    }
    result = await result.toArray();
    client.close();
    return result;
}
// 插入
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
// 删除
async function remove(colName,query){ // query{_id:'5c128cdbd1233ce12c878a32'}
    const {db,client} = await connect();

    if(query._id && typeof query._id === 'string'){
        query._id = ObjectId(query._id);
    }

    const collection = db.collection(colName);
    
    const result = await collection.deleteMany(query);

    client.close();
    return result;
}
// 修改
async function updateById(colName, query, id) {
    const {
        db,
        client
    } = await connect();
    let data = {};
    if (id && typeof id === 'string') {
        data._id = ObjectId(id);
    }
    const collection = db.collection(colName);
    const result = await collection.updateMany(data, {
        $set: query
    })
    client.close();
    return result;
}

module.exports = {
    find,
    insert,
    remove,
    updateById
}