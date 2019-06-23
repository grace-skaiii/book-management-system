use bookSystem;

create table _admin (
  id varchar(20) not null,
  password varchar(50) not null,
  username varchar(20) not null,
  jid varchar(20) not null,
  gender varchar(20) not null,
  age INTEGER not null,
  isSuperAdmin varchar(20) not null default 'False',
  regDay date not null default GETDATE(),
  -- isLoggedIn bit not null default 0,
  primary key (jid),
  CHECK(gender='male'or gender='female'),
);

create table customer(
  customerId varchar(20) not null,
  PASSWORD varchar(50) not null,
  gender varchar(20) not null,
  address varchar(20) not null,
  email varchar(20) not null,
  birthday date,
  tel varchar(20) not null,
  signTime date not null default GETDATE(),
  accCon numeric(6,2) not null default 0,
  discount numeric(3,2) not null default 0.90,
  PRIMARY KEY(customerId),
  CHECK(gender='male'or gender='female'),
  check(discount in(0.90,0.80,0.75))
)

create table categoryInfo(
  categoryId varchar(20) not null,
  categoryName varchar(20) not null,
  primary key(categoryId)
)

create table book(
  isbn varchar(20) not null,
  title varchar(20) not null,
  author varchar(20) not null,
  publisher varchar(20) not null,
  iprice numeric(6,2) not null,/*进价*/
  inventory Integer not null default 0,
  sprice numeric(6,2) ,/*零售价*/
  unpaid Integer not null default 0,
  categoryId varchar(20) not null,
  primary key(isbn),
  CHECK(inventory>=0),
  foreign key(categoryId) references categoryInfo(categoryId) on delete cascade,
);

create table bookWanted(
  title varchar(20) not null,
  author varchar(20) not null,
  PRIMARY KEY(title,author)
)


create table shopCart(
  orderId Integer not null identity(100000,1),
  isfirmed varchar(20) not null default 'no',
  time date not null default GETDATE(),
  isbn varchar(20) not null,
  customerId varchar(20) not null,
  amount numeric(6,2) not null,
  quantity Integer not null,
  PRIMARY KEY(orderId),
  FOREIGN key(isbn) references book(isbn),
  FOREIGN KEY(customerId) REFERENCES customer(customerId),
  check(quantity>=1)
)

create table _order(
  orderId Integer not null,
  isdelivered varchar(20) not null default 'no',
  isreceived varchar(20) not null default 'no',
  jid varchar(20) ,
  PRIMARY KEY(orderId),
  FOREIGN KEY(jid)REFERENCES _admin(jid),
  foreign KEY(orderId) REFERENCES shopCart(orderId),
)

create table sale(
  saleId Integer not null identity(200000,1),
  orderId Integer not null ,
  otime date not null default GETDATE(),
  PRIMARY key(saleId),
  FOREIGN KEY(orderId) REFERENCES _order(orderId)
)

create table stock(
  stockId Integer not null identity(300000,1),
  jid VARCHAR(20) not null,
  isbn varchar(20) not null,
  quantity INTEGER not null,
  amount numeric(6,2) not null,
  time date not null default GETDATE(),
  primary KEY(stockId),
  FOREIGN KEY(jid)REFERENCES _admin(jid),
  FOREIGN key(isbn) references book(isbn)
)



--创建视图

--把订单、购物车、顾客、书籍全都natural join
Go 
create view alljoin
as select O.orderId,C.customerId,B.title,S.quantity,B.sprice,C.discount,S.amount,B.isbn,C.address,C.tel,
O.isdelivered,S.isfirmed,O.isreceived,C.accCon
from _order O , shopCart S,customer C,book B
where O.orderId=S.orderId and S.customerId=C.customerId and S.isbn=B.isbn;

--顾客查看购物车的视图
Go
create view queryShopCart
as select S.orderId,C.customerId,B.title,S.quantity,B.sprice,C.discount,S.amount
from shopCart S,book B,customer C
where S.isbn=B.isbn and C.customerId = S.customerId and S.isfirmed='no';

--管理员查看待发货的订单
Go
create view queryNotDelivered
as select orderId,isbn,title,quantity,customerId,[address],tel
from alljoin
where isdelivered='no';

--顾客查看订单
Go
create view queryOrder
as select orderId,customerId,title,quantity,sprice,discount*sprice as newprice,amount,isreceived,isdelivered
from alljoin;

--管理员查看还未付款的书
GO
create view queryUnpaid
as select isbn,title,author,iprice,inventory,unpaid
from book
where unpaid>0

--在下单之后在_order中插入一条数据
GO
create trigger afterOrder
on shopCart
after update
as
if update(isfirmed)
  begin
    declare @OI varchar(20);
    select @OI=orderId from inserted;
    insert into _order(orderId) values(@OI);
  end

--在顾客确认确认收货之后对sale表插入一条记录并更新顾客的累积消费
GO
create trigger afterReceive
on _order
after update
as
if update(isreceived)
  begin
    declare @OI varchar(20);
    select @OI=orderId from inserted;
    insert into sale(orderId) values(@OI);
    declare @cons numeric(6,2);
    declare @add numeric(6,2);
    declare @id varchar(20);
    select @cons=accCon from alljoin where orderId=@OI;
    select @add=amount from alljoin where orderId=@OI;
    select @id=customerId from alljoin where orderId=@OI;
    set @cons=@cons+@add;
    update customer set accCon=@cons where customerId=@id;
  end

--当顾客累积消费增加后更改折扣
GO
create trigger changeDiscount
on customer
after update
as
if update(accCon)
  begin
    declare @cons numeric(6,2);
    declare @disc numeric(3,2);
    select @cons=accCon from inserted;
    if @cons > 500
    set @disc = 0.80;
    else if 1000 < @cons 
    set @disc = 0.75;
    else set @disc = 0.90;
    update customer set discount = @disc where customerId = (select customerId from inserted);
  end

--在sale表插入一条记录后更新库存数
Go
create trigger afterSale
on sale
after insert
as 
BEGIN 
declare @OI varchar(20);
select @OI=orderId from inserted;
update book
set inventory=inventory-(select quantity from alljoin where orderId=@OI)
where isbn=(select isbn from alljoin where orderId=@OI)
end

--在stock插入一条数据之后，更新库存数和未付款数
Go 
create trigger afterStock
on Stock
after insert AS
BEGIN
update book
set inventory=inventory+(select quantity from inserted),unpaid=0
where isbn=(select isbn from inserted)
end





