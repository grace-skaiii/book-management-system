'use strict';
const ipcRenderer = require('electron').ipcRenderer;
const db = require('../js/database');
const {remote} = require('electron');
var id=$('#search-box').value;
$('#search-button').click(function(){
    var sel_params=[id];
    db._query("select * from user where id=?",sel_params,(err, res) => {
        if (err) {
            console.error(err);
          }
        if(res.length==0)
        {
            $('#id-input-error').show();
        }
        else
        {
            $('#id-input-error').hide();
        }
})
})