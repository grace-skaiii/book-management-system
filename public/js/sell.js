'use strict';
const { remote } = require('electron');
const db = require('../js/database');
var express = require('express');
// var router = express.Router();
var key=$('#search-box').value;
var params=[];
var isbn,inventory,price,amount;
db._query("select * from book where concat('isbn','title','author','publisher') like ?",'%'+key+'%',(err,res) =>{
    if(err) throw err;
    res.render('sell',{result:res});}//渲染result模板，并传递res数据
);
     function saveEditTd(id) {
        var a = $("input[type='button'][id='"+id+"']").parent().siblings(); //td的兄弟节点
        var sell = a[6].children[0].value;
        isbn=a[0].innerText;
        inventory=a[4].innerText;
        price=a[5].innerText;
        inventory=inventory-sell;
        // var params=[title,author,publisher,inventory,buying_price,selling_price,isbn];
        var params=[inventory,isbn];
        db._query("update book set inventory=? where isbn=?",params,(err,res)=>{
           if(err){
            console.log(err);
           }
        });
        remote.getGlobal('sharedObj').financeId++;
        var id=remote.getGlobal('sharedObj').financeId,
        amount=sell*price;
        params=[id,amount,sell,'sell'];
        db_query("insert into financeRec(fid,amount,bookNumber,usage) values(?,?,?,?)",params,(err,res)=>{
            if(err){console.log(err);}
        })
        remote.getGlobal('sharedObj').income=remote.getGlobal('sharedObj').income+amount;
        params=[id,remote.getGlobal('sharedObj').expense,remote.getGlobal('sharedObj').income];
        db._query("insert into financeStat values(?,?,?)",params,(err,res)=>{
            if(err) console.log(err);
        })
     }
