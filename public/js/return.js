'use strict';
const db = require('../js/database');
var express = require('express');
// var router = express.Router();
var key=$('#search-box').value;
var params=[];
var isbn,unpaid;
db._query("select * from book where unpaid>0",params,(err,res) =>{
    if(err) throw err;
    if(res.length===0)
    {
        $('#id-input-error').show();
    }
    else{
        $('#id-input-error').hide();
        res.render('return',{result:res});}//渲染result模板，并传递res数据
        // unpaid=res[0].unpaid;
    }
);
     function saveEditTd(id) {
        var a = $("input[type='button'][id='"+id+"']").parent().siblings(); //td的兄弟节点
        var ret = a[6].children[0].value;
        isbn=a[0].innerText;
        unpaid=a[5].innerText;
        unpaid=unpaid-ret;
        // var params=[title,author,publisher,inventory,buying_price,selling_price,isbn];
        var params=[unpaid,isbn];
        db._query("update book set unpaid=? where isbn=?",params,(err,res)=>{
           if(err){
            console.log(err);
           }
        });
     }
