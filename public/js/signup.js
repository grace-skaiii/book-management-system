'use strict';
const ipcRenderer = require('electron').ipcRenderer;
const db = require('../js/database');
var i = document.getElementByName('id'),
  p = document.getElementByName('password'),
  n = document.getElementByName('username'),
  j = document.getElementByName('jid');
  g=$("input[name='gender']:checked");
  a = document.getElementByName('age');
$(function(){
    var $inputs=$('[data-rule]')
    ,$form=$('#signup')
    ,$back=$('#id_back')
    , inputs=[];
    // $back.on('click',function(e){
    //   ipcrenderer.send('logged-in');
    // });
    $inputs.each(function(index,node){
      //解析每一个input的验证规则
      var tmp=new Input(node);
      inputs.push(tmp);
    })
    $form.on('submit',function(e){
      e.preventDefault();
      $inputs.trigger('blur');
      for(var i=0;i<inputs.length;i++)
      {
        var item=inputs[i];
        var valid=item.validator.is_valid();
        if(!valid)
        {
          alert('wrong！');
          return;
        }
      }
      var sel_params=[i.value];
      db._query("select * from user where id = ?",params,  (err, res) => {
          if (res.length != 0) 
          document.getElementById('id-input-exist').show();
          else{ 
            document.getElementById('id-input-exist').hide();
            var md5PWD = (hex_md5(p.value)) ;
            var ins_params=[i.value,md5PWD,n.value,j.value,g.value,a.value]
            db._query("insert into [user](id,password,username,jid,gender,age) values(?,?,?,?,?,?)",ins_params, (err, res) => {
              if (err) { console.log(err); return;}});
            // ipcRenderer.send('sign-up-ok');
            }
        });
    })
  });
  