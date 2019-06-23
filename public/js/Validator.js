$(function() {
    'use strict';
    window.Validator = function(val, rule) {
      this.is_valid = function(new_val) {
        var key;
        if(new_val!==undefined)
        val = new_val ; //有更新则更新
        // 如果不是必填项并且没有填数据则true，不需要再进行其他检查
        if (!rule.required && !val)
          return true;
        for (key in rule) {
          //如果必填项继续检查其他的性质
          if (key === 'required')
            continue;
          //调用相对应方法
          var r = this['validate_' + key]();
          if (!r) return false;
        }
        return true;
      }
      this.validate_max = function() {
        pre_max_min();
        return val <= rule.max;
      }
      this.validate_min = function() {
        pre_max_min();
        return val >= rule.min;
      }
      this.validate_maxlength = function() {
        pre_length();
        return val.length <= rule.maxlength;
      }
      this.validate_minlength = function() {
        pre_length();
        return val.length >= rule.minlength;
      }
      this.validate_numeric = function() {
        return $.isNumeric(val);
      }
      this.validate_pattern = function() {
        var reg = new RegExp(rule.pattern);
        return reg.test(val);
      }
      this.validate_required = function() {
        var real = $.trim(val);
        if (!real && real !== 0)
          return false;
        return true;
      }
      // 把数据预处理封装
      function pre_max_min() {
        val = parseFloat(val);
      }
      function pre_length() {
        val = val.toString();
      }
    }
  })
  