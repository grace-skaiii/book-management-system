'use strict';
const { remote } = require('electron');
const db = require('../js/database');
var express = require('express');
var t1,t2;
$(function() {
  $('#datepicker1').datepicker({
  dateFormat:'yy-mm-dd',
  onClose: function(dateText, inst){//当日期面板关闭后触发此事件（无论是否有选择日期）
  t1=dateText;
}}); 
$('#datepicker2').datepicker({
  dateFormat:'yy-mm-dd',
  onClose: function(dateText, inst){//当日期面板关闭后触发此事件（无论是否有选择日期）
t2=dateText;
}}); 
})
var sql1="select * from financeRec R and financeStat S where R.fid=S.count and date >=? and date<=? and usage=?"
, sql2="select * from financeRec R and financeStat S where R.fid=S.count and date >=? and date<=?";
$('input[name="fin"][value="0"]').prop('checked',true);
$('input[name="fin"]').change(function(){
    if ($('input[name="fin"][value="1"]').prop("checked")) {
        var params=[t1,t2,'income'];
        db._query(sql1,params,(err,res)=>{
            if(err) throw err;
            else res.render('finance',{result:res});
        })
   } else if($('input[name="fin"][value="2"]').prop("checked")){
    var params=[t1,t2,'expense'];
    db._query(sql1,params,(err,res)=>{
        if(err) throw err;
        else res.render('finance',{result:res});
    })
   }
   else{
    var params=[t1,t2];
    db._query(sql2,params,(err,res)=>{
        if(err) throw err;
        else res.render('finance',{result:res});
   }
)}
})
