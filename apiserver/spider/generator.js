const fs = require('fs')

let genList = [];
new Promise((resolve)=>{
    fs.readFile("./data.json",'utf8',(err,data)=>{
        if(err){
            console.log(err)
        }else{
            let dataList = JSON.parse(data)
            dataList.forEach(ele=>{
                if(ele.item_type === 2){
                    let item = {
                    };
                    item.article_id = ele.item_info.article_id;
                    item.user_id = ele.item_info.article_info.user_id;
                    item.category =ele.item_info.category.category_name;
                    item.create_time =  ele.item_info.article_info.ctime;
                    item.is_original = ele.item_info.article_info.is_original;
                    item.digg_count = ele.item_info.article_info.digg_count;
                    item.comment_count = ele.item_info.article_info.comment_count;
                    item.view_count = ele.item_info.article_info.view_count;
                    item.cover_image = ele.item_info.article_info.cover_image;
                    item.title = ele.item_info.article_info.title;
                    item.brief_content = ele.item_info.article_info.brief_content;
                    item.is_real_data = 0;
    
                    genList.push(item)
                }
            });
            resolve(genList);
        }
    });
}).then(res =>{
    let genJson = JSON.stringify(res);
    let ws = fs.createWriteStream("./genData.json")
    ws.write(genJson);
})




