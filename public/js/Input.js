$(function() {
    'use strict';
    window.Input = function(selector) {
      var $ele,$error_ele, $me= this , rule = {required:true}; //空对象
      this.get_val=function(){
        return $ele.value;
      }
      this.load_validator=function(){
        var val=this.get_val();
        this.validator=new Validator(val,rule);
      }
      function init() {//在Init函数内完成
        find_ele();//找到该data-rule对应的input并转变成jquery对象
        get_error_ele();//找到由node对应的错误信息的id并转换成jquery对象
        parse_rule();//分解规则
        $me.load_validator();//new一个验证器
        listen();//时刻监听
      }
      function listen()
      {
        $ele.on('blur',function(){//blur:鼠标一离开就检测
          var valid=$me.validator.is_valid($me.get_val());//!!val会更新，所以is_valid需要参数
          if(valid)
            $error_ele.hide();
          else {
            $error_ele.show();
          }
        })
      }
      function get_error_ele(){//将错误信息id对应的div转换成jquery对象
        $error_ele=$(get_error_selector());//这样封装起来可以不要每次listen的时候都要选择错误信息
      }
      function get_error_selector(){//得到该node对应的错误信息的id
        return '#'+$ele.attr('name')+'-input-error';
      }
      function find_ele() {
        if (selector instanceof jQuery)
          $ele = selector;
        else {
          $ele = $(selector);
        }
      }
      function parse_rule(){
        var rule_str=$ele.data('rule');//获得rule字符串
        if(!rule_str)return;
        var rule_arr=rule_str.split('|');//获得rule字符串组
        for(var i=0;i<rule_arr.length;i++)
        {
          var item_arr=rule_arr[i].split(':');
          rule[item_arr[0]]=JSON.parse(item_arr[1]);//
        }
      }
      init();
    }
  })
  