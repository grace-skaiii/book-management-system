var express = require('express');
var router = express.Router();
var md5  = require('md5');
// var db=require('../database')  ;
var sql=require('mssql');
var ejs= require('ejs'),
fs = require('fs');
var customerId,discount;
var db =
    {
      user:'ly',
      password:'111',
      server:'localhost\\SQLEXPRESS',   //這邊要注意一下!!
      database:'bookSystem',
      port:'1433'
   };
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(md5('111'));
});
router.route('/customerLogin').get(function(req, res, next) {
  res.render('customerLogin');
})
router.route('/adminLogin').get(function(req, res, next) {
  res.render('adminLogin');
})
router.route('/auth').post(function(request, response) {
  sql.connect(db, function (err) {
    if (err)
      console.log(err);
    var re = new sql.Request();
    re.input('id', sql.NVarChar(20), request.body.id);
    re.query("select * from customer where customerId=@id", function (err, result) {
      if (err) {
        console.log(err)
        res.send(err);
      }
      sql.close();
      console.log('pwd:',result.recordset[0]['PASSWORD']);
      var p=md5(request.body.pwd);
      console.log('md5:',p);
    if(result===undefined){
      response.write('{"ok": false, "msg": "此用户不存在"}');
    }else if(result.recordset[0]['PASSWORD']===p){
        console.log('matched!');
        customerId=request.body.id;
        discount=result.recordset[0]['discount'];
        request.session.userName = request.body.id;
        response.redirect('/customerPage');
      }else{
        console.log('unmatched!');
      }
      response.end(); 
    });
});
});
router.route('/admin').post(function(request, response) {
  sql.connect(db, function (err) {
    if (err)
      console.log(err);
    var re = new sql.Request();
    re.input('id', sql.NVarChar(20), request.body.id);
    re.query("select * from _admin where id=@id", function (err, result) {
      if (err) {
        console.log(err)
        res.send(err);
      }
      sql.close();
      console.log('pwd:',result.recordset[0]['password']);
      var p=md5(request.body.pwd);
      console.log('md5:',p);
      if(result.recordset[0]['password']===p){
      console.log(result.recordset[0]['isSuperAdmin']);
        console.log('matched!');
        console.log(result.recordset[0]['isSuperAdmin']);
        adminId=request.body.id;
        jid=result.recordset[0]['jid'];
        request.session.adminName = request.body.id;
        if(!(result.recordset[0]['isSuperAdmin']))
          {
            response.redirect('/adminPage');
            console.log('普通管理员');
          }
        else
        {
          response.redirect('/superPage');
          console.log('超级管理员');
        }
      }
      else{
        console.log('unmatched!');
      }
      response.end(); 
    });
});
});
router.route('/superPage').get(function(req, res) {
  sql.connect(db, function (err) {
    if (err)
      console.log(err);
    var re = new sql.Request();
    re.input('id', sql.NVarChar(20), adminId);
    re.query("select * from _admin where id=@id", function (err, result) {
      if (err) {
        console.log(err)
        res.send(err);
      }
      sql.close();
      console.log(result.recordset);
  res.render('superPage',{data:result.recordset,id:adminId});
});
  });
});
router.route('/adminPage').get(function(req, res) {
  sql.connect(db, function (err) {
    if (err)
      console.log(err);
    var re = new sql.Request();
    re.input('id', sql.NVarChar(20), adminId);
    re.query("select * from _admin where id=@id", function (err, result) {
      if (err) {
        console.log(err)
        res.send(err);
      }
      sql.close();
      console.log(result.recordset);
  res.render('adminPage',{data:result.recordset,id:adminId});
});
  });
});
router.route('/customerPage').get(function(req, res) {
  res.render('customerPage');
});
router.route('/customerSearch').post(function(request,res){
  sql.connect(db, function (err) {
    if (err)
      console.log(err);
    var re = new sql.Request();
    re.input('content', sql.NVarChar(50), request.body.search_box);
    re.query("select * from book where title like '%'+@content+'%' or author  like '%'+@content+'%'",(err,result) =>{
      if (err) {
        console.log(err)
        res.send(err);
      }
      sql.close();
      res.render('customerSearch',{data:result.recordset});
  });
});
});
router.route('/customerCart').get(function(request, response) {
  sql.connect(db, function (err) {
      if (err)
        console.log(err);
      var re = new sql.Request();
      re.input('id', sql.NVarChar(20), request.session.userName);
      re.query("select * from queryShopCart where customerId=@id",(err,result) =>{
        if (err) {
          console.log(err)
          res.send(err);
        }
        sql.close();
        response.render('customerCart',{data:result.recordset});
    });
  });
  });
  router.route('/addCart').post(function(request,response){
      obj=request.body;
      // console.log(obj,'数据已接收');
      sql.connect(db, function (err) {
        if (err)
          console.log(err);
        for(var i=0;i<obj.length;i++){
          console.log(obj[i]);
        var re = new sql.Request();
        re.input('isbn', sql.NVarChar(20), obj[i].isbn);
        re.input('amount', sql.Decimal(6,2), obj[i].amount*discount);
        re.input('quantity', sql.Int, obj[i].quantity);
        re.input('customerId', sql.NVarChar(20), request.session.userName);
        re.query("insert into shopCart(isbn,customerId,amount,quantity) values(@isbn,@customerId,@amount,@quantity)",(err,result) =>{
          if (err) {
            console.log(err)
            response.send(err);
          }
          sql.close();
      });
    };
    });
    response.send('finished!');
    });
  router.route('/orderConfirm').post(function(request,response){
      obj=request.body;
      sql.connect(db, function (err) {
        if (err)
          console.log(err);
        for(var i=0;i<obj.length;i++){
          console.log(obj[i]);
        var re = new sql.Request();
        re.input('orderId', sql.Int, obj[i].orderId);
        re.query("update shopCart set isfirmed='yes' where orderId=@orderId",(err,result) =>{
          if (err) {
            console.log(err)
            response.send(err);
          }
          sql.close();
      });
    };
    });
    response.send('finished!');
    });
  router.route('/addBookWanted').post(function(request,response){
      sql.connect(db, function (err) {
        if (err)
          console.log(err);
        var re = new sql.Request();
        re.input('title', sql.NVarChar(20), request.body.title);
        re.input('author', sql.NVarChar(20), request.body.author);
        re.query("insert into bookWanted(title,author) values(@title,@author)",(err,result) =>{
          if (err) {
            console.log(err)
            response.send(err);
          }
          sql.close();
      });
    });
    response.send('finished!');
    });
    router.route('/customerCart').get(function(request, response) {
      sql.connect(db, function (err) {
          if (err)
            console.log(err);
          var re = new sql.Request();
          re.input('id', sql.NVarChar(20),  request.session.userName);
          re.query("select * from queryShopCart where customerId=@id",(err,result) =>{
            if (err) {
              console.log(err)
              res.send(err);
            }
            sql.close();
            response.render('customerCart',{data:result.recordset});
        });
      });
      });
      router.route('/customerOrder').get(function(request, response) {
        sql.connect(db, function (err) {
            if (err)
              console.log(err);
            var re = new sql.Request();
            re.input('id', sql.NVarChar(20),  request.session.userName);
            re.query("select * from queryOrder where customerId=@id",(err,result) =>{
              if (err) {
                console.log(err)
                res.send(err);
              }
              sql.close();
              response.render('customerOrder',{data:result.recordset});
          });
        });
        });
        router.route('/japan').get(function(request,response){
          sql.connect(db, function (err) {
            if (err)
              console.log(err);
            var re = new sql.Request();
            re.query("select * from book B, categoryInfo C where C.categoryName='日本' and C.categoryId=B.categoryId",(err,result) =>{
              if (err) {
                console.log(err)
                response.send(err);
              }
              sql.close();
              response.render('japan',{data:result.recordset})
          });
        });
        });
        router.route('/editAdmin').post(function(request,response){
          sql.connect(db, function (err) {
            if (err)
              console.log(err);
            var re = new sql.Request();
            re.input('id', sql.NVarChar(20), request.body.id);
            re.input('pwd',sql.NVarChar(50), md5(request.body.pwd));
            re.input('username', sql.NVarChar(20), request.body.username);
            re.input('gender', sql.NVarChar(20), request.body.gender);
            re.input('age', sql.Int, request.body.age);
            re.query("update _admin set password=@pwd,username=@username,gender=@gender,age=@age where id=@id",(err,result) =>{
              if (err) {
                console.log(err)
                response.send(err);
              }
              sql.close();
          });
        });
        response.send('finished!');
        });
        router.route('/otherAdmin').post(function(request, response) {
          sql.connect(db, function (err) {
              if (err)
                console.log(err);
              console.log(request.body.jid);
              var re = new sql.Request();
              re.input('jid', sql.NVarChar(20),  request.body.jid);
              re.query("select * from _admin where jid=@jid",(err,result) =>{
                if (err) {
                  console.log(err)
                  res.send(err);
                }
                sql.close();
                
                response.render('otherAdmin',{data:result.recordset,id:adminId});
            });
          });
          });
        router.route('/otherAdmin').get(function(request, response) {
          sql.connect(db, function (err) {
              if (err)
                console.log(err);
              var re = new sql.Request();
              re.query("select * from _admin where isSuperAdmin='False'",(err,result) =>{
                if (err) {
                  console.log(err)
                  res.send(err);
                }
                sql.close();
                response.render('otherAdmin',{data:result.recordset,id:adminId});
            });
          });
          });
        router.route('/deleteAdmin').post(function(request,response){
            sql.connect(db, function (err) {
              if (err)
                console.log(err);
              console.log(request.body.jid);
              var re = new sql.Request();
              re.input('jid', sql.NVarChar(20), request.body.jid);
              re.query("delete _admin where jid=@jid",(err,result) =>{
                if (err) {
                  console.log(err)
                  response.send(err);
                }
                sql.close();
            });
          });
          response.send('finished!');
          });
          router.route('/addAdmin').post(function(request,response){
            sql.connect(db, function (err) {
              if (err)
                console.log(err);
              console.log(request.body.jid);
              var re = new sql.Request();
              
              re.input('id', sql.NVarChar(20), request.body.id);
              re.input('pwd', sql.NVarChar(50), md5(request.body.pwd));
              re.input('zgh', sql.NVarChar(20), request.body.zgh);
              re.input('gender', sql.NVarChar(20), request.body.gender);
              re.input('age', sql.Int, request.body.age);
              re.input('username', sql.NVarChar(20), request.body.username);
              re.query("insert into _admin(id,password,jid,username,gender,age) values(@id,@pwd,@zgh,@username,@gender,@age)",(err,result) =>{
                if (err) {
                  console.log(err)
                  response.send(err);
                }
                sql.close();
            });
          });
          response.send('finished!');
          });
          router.route('/updateBook').get(function(request,response){
            sql.connect(db, function (err) {
              if (err)
                console.log(err);
              var re = new sql.Request();
              re.query("select * from book,categoryInfo C where book.categoryId=C.categoryId ",(err,result) =>{
                if (err) {
                  console.log(err)
                  response.send(err);
                }
                sql.close();
                response.render('updateBook',{data:result.recordset,id:adminId})
            });
          });
          });
          router.route('/updateBook').post(function(request,response){
            sql.connect(db, function (err) {
              if (err)
                console.log(err);
              var re = new sql.Request();
              re.input('key', sql.NVarChar(20), request.body.key);
              re.query("select * from book,categoryInfo C where book.categoryId=C.categoryId and( title like '%'+@key+'%' or author  like '%'+@key+'%' or publisher  like '%'+@key+'%'or C.categoryName  like '%'+@key+'%') ",(err,result) =>{
                if (err) {
                  console.log(err)
                  response.send(err);
                }
                sql.close();
                response.render('updateBook',{data:result.recordset,id:adminId})
            });
          });
          });
          router.route('/addBook').post(function(request,response){
            sql.connect(db, function (err) {
              if (err)
                console.log(err);
              var re = new sql.Request();
              re.input('isbn', sql.NVarChar(20), request.body.isbn);
              re.input('title', sql.NVarChar(20), request.body.title);
              re.input('author', sql.NVarChar(20), request.body.author);
              re.input('publisher', sql.NVarChar(20), request.body.publisher);
              re.input('category', sql.NVarChar(20), request.body.category);
              re.input('iprice', sql.Decimal(6,2), request.body.iprice),
              re.input('unpaid', sql.Int, request.body.unpaid),
              re.query("insert into book(isbn,title,author,publisher,categoryId,iprice,unpaid) values(@isbn,@title,@author,@publisher,(select categoryId from categoryInfo where categoryName=@category),@iprice,@unpaid)",(err,result) =>{
                if (err) {
                  console.log(err)
                  response.send(err);
                }
                sql.close();
            });
          });
          response.send('finished!');
          });
          router.route('/editBook').post(function(request,response){
            sql.connect(db, function (err) {
              if (err)
                console.log(err);
              var re = new sql.Request();
              re.input('isbn', sql.NVarChar(20), request.body.isbn);
              re.input('title', sql.NVarChar(20), request.body.title);
              re.input('author', sql.NVarChar(20), request.body.author);
              re.input('publisher', sql.NVarChar(20), request.body.publisher);
              re.input('category', sql.NVarChar(20), request.body.category);
              re.input('iprice', sql.Decimal(6,2), request.body.iprice);
              re.input('sprice', sql.Decimal(6,2), request.body.sprice);
              re.input('unpaid', sql.Int, request.body.unpaid);
              re.query("update book set title=@title,author=@author,publisher=@publisher,categoryId=(select categoryId from categoryInfo where categoryName=@category),iprice=@iprice,sprice=@sprice,unpaid=@unpaid where isbn=@isbn",(err,result) =>{
                if (err) {
                  console.log(err)
                  response.send(err);
                }
               console.log('update successfully!');
                sql.close();
            });
          });
          response.send('finished!');
          });
          router.route('/payBook').get(function(request,response){
            sql.connect(db, function (err) {
              if (err)
                console.log(err);
              var re = new sql.Request();
              re.query("select * from queryUnpaid ",(err,result) =>{
                if (err) {
                  console.log(err)
                  response.send(err);
                }
                sql.close();
                response.render('payBook',{data:result.recordset,id:adminId})
            });
          });
         });
          router.route('/importBook').get(function(request,response){
            sql.connect(db, function (err) {
              if (err)
                console.log(err);
              var re = new sql.Request();
              re.query("select * from bookWanted bw where bw.title not in(select b.title from book b) or (select o.inventory from book o where o.title=bw.title)=0",(err,result) =>{
                if (err) {
                  console.log(err)
                  response.send(err);
                }
                sql.close();
                console.log(result.recordset);
                response.render('importBook',{data:result.recordset,id:adminId})
            });
          });
         });
         router.route('/pay').post(function(request,response){
          sql.connect(db, function (err) {
            if (err)
              console.log(err);
            var re = new sql.Request();
            re.input('jid', sql.NVarChar(20), jid);
            re.input('isbn', sql.NVarChar(20), request.body.isbn);
            re.input('quantity', sql.Int, request.body.quan);
            re.input('amount', sql.Decimal(6,2), request.body.quan*request.body.pri);
            re.query("insert into stock(jid,isbn,quantity,amount) values(@jid,@isbn,@quantity,@amount)",(err,result) =>{
              if (err) {
                console.log(err)
                response.send(err);
              }
              sql.close();
          });
        });
        response.send('finished!');
        });
         router.route('/return').post(function(request,response){
          sql.connect(db, function (err) {
            if (err)
              console.log(err);
            var re = new sql.Request();
            re.input('isbn', sql.NVarChar(20), request.body.isbn);
            re.query("update book set unpaid=0 where isbn=@isbn",(err,result) =>{
              if (err) {
                console.log(err)
                response.send(err);
              }
              sql.close();
          });
        });
        response.send('finished!');
        });
        router.route('/deliverBook').get(function(request,response){
          sql.connect(db, function (err) {
            if (err)
              console.log(err);
            var re = new sql.Request();
            re.query("select * from queryNotDelivered ",(err,result) =>{
              if (err) {
                console.log(err)
                response.send(err);
              }
              sql.close();
              response.render('deliverBook',{data:result.recordset,id:adminId})
          });
        });
       });
       router.route('/deliver').post(function(request,response){
        sql.connect(db, function (err) {
          if (err)
            console.log(err);
          var re = new sql.Request();
          re.input('orderId', sql.Int, request.body.id);
          re.input('jid', sql.NVarChar(20), jid);
          re.query("update _order set isdelivered='yes',jid=@jid where orderId=@orderId",(err,result) =>{
            if (err) {
              console.log(err)
              response.send(err);
            }
            sql.close();
        });
      });
      response.send('finished!');
      });
       router.route('/receiveConfirm').post(function(request,response){
         obj=request.body;
         console.log("sss",obj);
        sql.connect(db, function (err) {
          if (err)
            console.log(err);
          for(var i=0;i<obj.length;i++){ 
          var re = new sql.Request();
          re.input('orderId', sql.Int, obj[i].orderId);
          re.query("update _order set isreceived='yes' where orderId=@orderId",(err,result) =>{
            if (err) {
              console.log(err)
              response.send(err);
            }
            sql.close();
        });
      }
      response.send('finished!');
    });
      });
      router.route('/finance').get(function(request,response){
        var carts=[];
            response.render('finance',{data:carts,id:adminId})
        });
     router.route('/queryFinance').post(function(request,response){
      obj=request.body;
     sql.connect(db, function (err) {
       if (err)
         console.log(err);
       var re = new sql.Request();
       re.input('start', sql.Date, obj.start);
       re.input('end', sql.Date, obj.end);
       if(obj.fin=='1')
       {
         re.query("select sa.orderId as id,sh.amount as amount,O.jid as jid,sa.otime as time from sale sa,shopCart sh, _order O where sa.orderId=sh.orderId and sa.orderId=O.orderId and sa.otime >=@start and sa.otime<= @end",(err,result) =>{
         if (err) {
           console.log(err)
           response.send(err);
         }
         sql.close();
         response.render('finance',{data:result.recordset,id:adminId});
        })
      }
      else{
        re.query("select stockId as id,jid,amount,time from stock where time >=@start and time<= @end",(err,result) =>{
          if (err) {
            console.log(err)
            response.send(err);
          }
          sql.close();
          response.render('finance',{data:result.recordset,id:adminId});
         })
      }
     });
  
 });
          module.exports = router;
