`use strict`
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'DESKTOP-O34LJOD\SQLExpress',
  user: 'ly',
  password: '111',
  database: 'bookSystem'
});
var _query = function(sql, params,callback) {
  pool.getConnection(function(err, conn) {
    if (err) console.error(err);
    conn.query(sql, params,function(err, res) {
      callback(err, res);
      conn.release();
    });
  })
};
module.exports._query = _query;