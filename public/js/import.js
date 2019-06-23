'use strict';
const db = require('../js/database');
const {remote} = require('electron');
var express = require('express');
// var router = express.Router();
var key=$('#search-box').value;
var params=[key];
var isbn,unpaid,inventory,price;
db._query("select * from book where isbn=?",params,(err,res) =>{
    if(err) throw err;
    if(res.length===0)
    {
        $('#id-input-error').show();
    }
    else{
        $('#id-input-error').hide();
        res.render('query',{result:res});}//渲染result模板，并传递res数据
        unpaid=res[0].unpaid;
        isbn=res[0].isbn;
    }
);
// function editTd(id) {
//     //选中编辑按钮的时候,把这行指定的几个td变成文本框
//     var b = $("input[type='button'][id='"+id+"']").parent(); //td
//     // var b = $("input[type='button'][name='edit']").parent(); //td
//     var a = b.siblings(); //td的兄弟节点
//     if(a[6].children.length===0){
//        a[6].innerHTML="<input type='text' value='"+a[6].innerText+"'/>";
//     }
//     b[0].innerHTML="<input id='"+id+"' type='button' onclick='saveEditTd(this.id);' value='保存'/>";
// }
     function saveEditTd(id) {
        var a = $("input[type='button'][id='"+id+"']").parent().siblings(); //td的兄弟节点
        var pur = a[6].children[0].value,
        unpaid=unpaid+pur;
        // var params=[title,author,publisher,inventory,buying_price,selling_price,isbn];
        var param=[unpaid,isbn];
        db._query("update book set unpaid=? where isbn=?",params,(err,res)=>{
           if(err){
            console.log(err);
           }
        });
     }
     var sel_params=[];
     $('#pay').click(function(){
        db._query("select * from book where unpaid>0",sel_params,(err,res) =>{
            if(err) throw err;
                res.render('import',{result:res});}//渲染result模板，并传递res数据
        );
     });
    function saveEditTd1(id) {
        var a = $("input[type='button'][id='"+id+"']").parent().siblings(); //td的兄弟节点
        isbn=a[0].innerText;
       unpaid=a[7].innerText;
       price=a[5].innerText;
       inventory=a[4].innerText;
       inventory=inventory+unpaid;
        var sprice = a[6].children[0].value;
        // var params=[title,author,publisher,inventory,buying_price,selling_price,isbn];
        var param=[inventory,sprice,isbn];
        db._query("update book set unpaid=0,inventory=?,sprice=? where isbn=?",params,(err,res)=>{
           if(err){
            console.log(err);
           }
        });
        remote.getGlobal('sharedObj').financeId++;
        var id=remote.getGlobal('sharedObj').financeId,
        amount=unpaid*price;
        params=[id,amount,unpaid,'buy'];
        db_query("insert into financeRec(fid,amount,bookNumber,usage) values(?,?,?,?)",params,(err,res)=>{
            if(err){console.log(err);}
        })
        remote.getGlobal('sharedObj').expense=remote.getGlobal('sharedObj').expense+amount;
        params=[id,remote.getGlobal('sharedObj').expense,remote.getGlobal('sharedObj').income];
        db._query("insert into financeStat values(?,?,?)",params,(err,res)=>{
            if(err) console.log(err);
        })
    }
