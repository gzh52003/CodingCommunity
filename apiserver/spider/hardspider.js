const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const url = "http://www.juanpi.com/nanzhuang"


request(url,(err,res,body)=>{
    let $ = cheerio.load(body);
    const goodslist = []
    let imgidx = 0;
    $('.goods-list').find('li').each((idx,el)=>{
        const $el = $(el);
        const goodsid = $el.attr("id")
        const title = $el.find('.good-title a').text();
        let price = $el.find('.price-old').text()
        price = price.match(/[\d\.]+/)[0]
        let currentprice = $el.find('.price-current').text()
        currentprice = currentprice.match(/[\d\.]+/)[0]
        const imgurl = $el.find('.pic-img img').attr('d-src')
        

        // 2. 爬取图片到本地
        // request请求图片地址，返回一个数据流
        const fileStream = fs.createWriteStream('./img/'+ imgidx++ + ".jpg");
        request(imgurl).pipe(fileStream);

        const goods = {
            goodsid,
            title,
            price,
            currentprice,
            imgurl:'./img/'+ imgidx + ".jpg"
        }
        goodslist.push(goods);
    });
    let jqJson = JSON.stringify(goodslist)
    let ws = fs.createWriteStream("./jp.json")
    ws.write(jqJson);
})