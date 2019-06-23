'use strict';
const ipcRenderer = require('electron').ipcRenderer;
const db = require('../js/database');
const {remote} = require('electron');
var express = require('express');
// var router = express.Router();
var key=$('#search-box').value;
var params=[key];
var isbn;
db._query("select * from book where concat('isbn','title','author','publisher') like ?",'%'+key+'%',(err,res) =>{
    if(err) throw err;
    res.render('query',{result:res});}//渲染result模板，并传递res数据
);
function editTd(id) {
    //选中编辑按钮的时候,把这行指定的几个td变成文本框
    var b = $("input[type='button'][id='"+id+"']").parent(); //td
    // var b = $("input[type='button'][name='edit']").parent(); //td
    var a = b.siblings(); //td的兄弟节点
   //  if(a[1].children.length===0){
   //     a[1].innerHTML="<input type='text' value='"+a[1].innerText+"'/>";
   //  }
   isbn=a[1].innerText;
    if(a[1].children.length===0){
       a[1].innerHTML="<input type='text' value='"+a[1].innerText+"'/>";
    }
    if(a[2].children.length===0){
       a[2].innerHTML="<input type='text' value='"+a[2].innerText+"'/>";
    }
    if(a[3].children.length===0){
       a[3].innerHTML="<input type='text' value='"+a[3].innerText+"'/>";
    }
    if(a[4].children.length===0){
       a[4].innerHTML="<input type='text' value='"+a[4].innerText+"'/>";
    }
    if(a[5].children.length===0){
       a[5].innerHTML="<input type='text' value='"+a[5].innerText+"'/>";
    }
    if(a[6].children.length===0){
       a[6].innerHTML="<input type='text' value='"+a[6].innerText+"'/>";
    }
    //将编辑改成 保存和取消两个按钮
    b[0].innerHTML="<input id='"+id+"' type='button' onclick='saveEditTd(this.id);' value='保存'/>";}
   //  <input type='button' onclick='resertEditTd();' value='取消'/>";
    // function resertEditTd() {
    //     ready(); //此方法是自己写的，局部刷新页面，重新加载数据
    //  }
     //保存editTd编辑
     function saveEditTd(id) {
        var a = $("input[type='button'][id='"+id+"']").parent().siblings(); //td的兄弟节点
      //   var isbn = a[1].children[0].value; 
        var title = a[1].children[0].value; 
        var author = a[2].children[0].value; 
        var publisher = a[3].children[0].value; 
        var inventory = a[4].children[0].value; 
        var buying_price = a[5].children[0].value; 
        var selling_price = a[6].children[0].value; 
        var params=[title,author,publisher,inventory,buying_price,selling_price,isbn];
        db._query("update book set title=?,author=?,publisher=?,inventory=?,iprice=? ,sprice=? where isbn=?",params,(err,res)=>{
           if(err){
            console.log(err);
           }
        });
        // var url = base_path+"console/cfg/saveEditTd";
        // $.ajax({
        //    url:url,
        //    type:"post",
        //    data:{
        //       "td_name":td_name,
        //       "td_alias":td_alias,
        //       "td_type":td_type,
        //       "id":id,
        //       "tpl":configId
        //    },
        //    datatype:"json",
        //    success:function (result) {
        //       ready(); //此方法是自己写的，局部刷新页面，重新加载数据
        //    }
        // });
     }
     $('#add').click(function(){
      var tb=$("book_info");
      var newTr=tb.insertRow(0);
      var newTd1=newTr.insertCell();//表示在添加的行上添加第一格
      newTd1.innerHTML="<input type='text' name='isbn' />";
      var newTd2=newTr.insertCell();//表示在添加的行上添加第一格
      newTd2.innerHTML="<input type='text' name='title' />";
      var newTd3=newTr.insertCell();//表示在添加的行上添加第一格
      newTd3.innerHTML="<input type='text' name='author' />";
      var newTd4=newTr.insertCell();//表示在添加的行上添加第一格
      newTd4.innerHTML="<input type='text' name='publisher' />";
      var newTd5=newTr.insertCell();//表示在添加的行上添加第一格
      newTd5.innerHTML="<input type='text' name='inventory' />";
      var newTd6=newTr.insertCell();//表示在添加的行上添加第一格
      newTd6.innerHTML="<input type='text' name='iprice' />";
      var newTd7=newTr.insertCell();//表示在添加的行上添加第一格
      newTd7.innerHTML="/";
      var newTd8=newTr.insertCell();//表示在添加的行上添加第一格
      newTd8.innerHTML="<button type='button' name='save'  onclick='saveNew(this.id);'/>";
     });
     function saveNew(){
      var a = $("input[type='button'][id='"+id+"']").parent().siblings(); //td的兄弟节点
        var isbn = a[0].children[0].value; 
        var title = a[1].children[0].value; 
        var author = a[2].children[0].value; 
        var publisher = a[3].children[0].value; 
        var inventory = a[4].children[0].value; 
        var buying_price = a[5].children[0].value; 
      //   var selling_price = a[6].children[0].value; 
        var params=[isbn,title,author,publisher,inventory,buying_price];
        db._query("insert into book(isbn,title,author,publisher,inventory,iprice) values(?,?,?,?,?,?)",params,(err,res)=>{
           if(err){
            console.log(err);
           }
        });
     }
