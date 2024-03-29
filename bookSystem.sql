USE [bookSystem]
GO
/****** Object:  User [ly]    Script Date: 05/12/2019 17:05:33 ******/
CREATE USER [ly] FOR LOGIN [ly] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[categoryInfo]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[categoryInfo](
	[categoryId] [varchar](20) NOT NULL,
	[categoryName] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[categoryId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[categoryInfo] ([categoryId], [categoryName]) VALUES (N'I247.53', N'历史')
INSERT [dbo].[categoryInfo] ([categoryId], [categoryName]) VALUES (N'I287.47', N'小说')
INSERT [dbo].[categoryInfo] ([categoryId], [categoryName]) VALUES (N'I313', N'日本')
INSERT [dbo].[categoryInfo] ([categoryId], [categoryName]) VALUES (N'I4', N'欧洲')
INSERT [dbo].[categoryInfo] ([categoryId], [categoryName]) VALUES (N'I5', N'文学')
INSERT [dbo].[categoryInfo] ([categoryId], [categoryName]) VALUES (N'I7', N'美洲')
INSERT [dbo].[categoryInfo] ([categoryId], [categoryName]) VALUES (N'I99', N'教材')
/****** Object:  Table [dbo].[book]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book](
	[isbn] [varchar](20) NOT NULL,
	[title] [varchar](20) NOT NULL,
	[author] [varchar](20) NOT NULL,
	[publisher] [varchar](20) NOT NULL,
	[iprice] [numeric](6, 2) NOT NULL,
	[inventory] [int] NOT NULL,
	[sprice] [numeric](6, 2) NULL,
	[unpaid] [int] NOT NULL,
	[categoryId] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[isbn] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'89986976', N'红楼梦', N'曹雪芹', N'你你你', CAST(88.00 AS Numeric(6, 2)), 5, NULL, 0, N'I5')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787040419085', N'离散数学', N'屈婉玲', N'高等教育出版社', CAST(38.00 AS Numeric(6, 2)), 5, NULL, 0, N'I99')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787214070456', N'大明王朝1566', N'刘和平', N'江苏人民出版社', CAST(43.20 AS Numeric(6, 2)), 14, CAST(49.00 AS Numeric(6, 2)), 0, N'I247.53')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787506344791', N'俗世奇人', N'冯骥才', N'作家出版社', CAST(18.70 AS Numeric(6, 2)), 5, CAST(25.00 AS Numeric(6, 2)), 0, N'I287.47')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787544267618', N'嫌疑人X的献身', N'东野圭吾', N'出版公司', CAST(26.20 AS Numeric(6, 2)), 0, CAST(33.00 AS Numeric(6, 2)), 0, N'I313')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787544274692', N'祈祷落幕时', N'东野圭吾', N'南海出版公司', CAST(29.60 AS Numeric(6, 2)), 4, CAST(35.00 AS Numeric(6, 2)), 0, N'I313')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787544277617', N'霍乱时期的爱情', N'马尔克斯', N'南海出版公司', CAST(37.10 AS Numeric(6, 2)), 5, CAST(45.00 AS Numeric(6, 2)), 0, N'I7')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787544282642', N'分身', N'东野圭吾', N'南海出版公司', CAST(29.60 AS Numeric(6, 2)), 4, CAST(35.00 AS Numeric(6, 2)), 0, N'I313')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'978754428I3138', N'恶意', N'东野圭吾', N'南海出版公司', CAST(29.60 AS Numeric(6, 2)), 5, CAST(35.00 AS Numeric(6, 2)), 0, N'I313')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787544291224', N'放学后', N'东野圭吾', N'南海出版公司', CAST(33.70 AS Numeric(6, 2)), 0, CAST(40.00 AS Numeric(6, 2)), 0, N'I313')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787544291811', N'幻夜', N'东野圭吾', N'南海出版公司', CAST(43.70 AS Numeric(6, 2)), 5, CAST(48.00 AS Numeric(6, 2)), 0, N'I313')
INSERT [dbo].[book] ([isbn], [title], [author], [publisher], [iprice], [inventory], [sprice], [unpaid], [categoryId]) VALUES (N'9787544772976', N'杀死一只知更鸟', N'哈珀·李', N'译林出版社', CAST(25.10 AS Numeric(6, 2)), 3, CAST(35.00 AS Numeric(6, 2)), 0, N'I7')
/****** Object:  Table [dbo].[customer]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[customer](
	[customerId] [varchar](20) NOT NULL,
	[PASSWORD] [varchar](50) NULL,
	[gender] [varchar](20) NOT NULL,
	[address] [varchar](20) NOT NULL,
	[email] [varchar](20) NOT NULL,
	[birthday] [date] NULL,
	[tel] [varchar](20) NOT NULL,
	[signTime] [date] NOT NULL,
	[accCon] [numeric](6, 2) NOT NULL,
	[discount] [numeric](3, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[customerId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[customer] ([customerId], [PASSWORD], [gender], [address], [email], [birthday], [tel], [signTime], [accCon], [discount]) VALUES (N'vikky', N'bcbe3365e6ac95ea2c0343a2395834dd', N'female', N'balabala', N'951020410@qq.com', NULL, N'18717961171', CAST(0x913F0B00 AS Date), CAST(211.50 AS Numeric(6, 2)), CAST(0.90 AS Numeric(3, 2)))
/****** Object:  Table [dbo].[shopCart]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[shopCart](
	[orderId] [int] IDENTITY(100000,1) NOT NULL,
	[isfirmed] [varchar](20) NOT NULL,
	[time] [date] NOT NULL,
	[isbn] [varchar](20) NOT NULL,
	[customerId] [varchar](20) NOT NULL,
	[amount] [numeric](6, 2) NOT NULL,
	[quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[orderId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[shopCart] ON
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100072, N'yes', CAST(0x943F0B00 AS Date), N'9787544267618', N'vikky', CAST(54.00 AS Numeric(6, 2)), 2)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100073, N'yes', CAST(0x943F0B00 AS Date), N'978754428I3138', N'vikky', CAST(31.50 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100074, N'yes', CAST(0x943F0B00 AS Date), N'9787544267618', N'vikky', CAST(27.00 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100075, N'yes', CAST(0x943F0B00 AS Date), N'9787544291811', N'vikky', CAST(43.20 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100076, N'no', CAST(0x953F0B00 AS Date), N'9787544267618', N'vikky', CAST(27.00 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100077, N'yes', CAST(0x953F0B00 AS Date), N'9787544274692', N'vikky', CAST(31.50 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100078, N'no', CAST(0x953F0B00 AS Date), N'9787506344791', N'vikky', CAST(22.50 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100079, N'yes', CAST(0x993F0B00 AS Date), N'9787544267618', N'vikky', CAST(27.00 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100080, N'yes', CAST(0x993F0B00 AS Date), N'9787544291811', N'vikky', CAST(129.60 AS Numeric(6, 2)), 3)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100081, N'yes', CAST(0x9B3F0B00 AS Date), N'9787544267618', N'vikky', CAST(54.00 AS Numeric(6, 2)), 2)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100082, N'yes', CAST(0x9B3F0B00 AS Date), N'9787544291224', N'vikky', CAST(36.00 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100083, N'yes', CAST(0x9B3F0B00 AS Date), N'9787544282642', N'vikky', CAST(31.50 AS Numeric(6, 2)), 1)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100084, N'yes', CAST(0x9F3F0B00 AS Date), N'9787544291224', N'vikky', CAST(180.00 AS Numeric(6, 2)), 5)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100085, N'yes', CAST(0x9F3F0B00 AS Date), N'978754428I3138', N'vikky', CAST(157.50 AS Numeric(6, 2)), 5)
INSERT [dbo].[shopCart] ([orderId], [isfirmed], [time], [isbn], [customerId], [amount], [quantity]) VALUES (100086, N'yes', CAST(0x9F3F0B00 AS Date), N'9787544291224', N'vikky', CAST(180.00 AS Numeric(6, 2)), 5)
SET IDENTITY_INSERT [dbo].[shopCart] OFF
/****** Object:  View [dbo].[alljoin]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[alljoin]
as select O.orderId,C.customerId,B.title,S.quantity,B.sprice,C.discount,S.amount,B.isbn,C.address,C.tel,
O.isdelivered,S.isfirmed,O.isreceived,C.accCon
from _order O , shopCart S,customer C,book B
where O.orderId=S.orderId and S.customerId=C.customerId and S.isbn=B.isbn;

--顾客查看购物车的视图
GO
/****** Object:  View [dbo].[queryOrder]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[queryOrder]
as select orderId,customerId,title,quantity,sprice,discount*sprice as newprice,amount,isreceived,isdelivered
from alljoin;
GO
/****** Object:  View [dbo].[queryNotDelivered]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[queryNotDelivered]
as select orderId,isbn,title,quantity,customerId,[address],tel
from alljoin
where isdelivered='no';
GO
/****** Object:  Table [dbo].[_admin]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[_admin](
	[id] [varchar](20) NOT NULL,
	[password] [varchar](50) NULL,
	[username] [varchar](20) NOT NULL,
	[jid] [varchar](20) NOT NULL,
	[gender] [varchar](20) NOT NULL,
	[age] [int] NOT NULL,
	[isSuperAdmin] [bit] NOT NULL,
	[regDay] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[jid] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[_admin] ([id], [password], [username], [jid], [gender], [age], [isSuperAdmin], [regDay]) VALUES (N'zcr', N'698d51a19d8a121ce581499d7b701668', N'Grace', N'000001', N'female', 19, 1, CAST(0x913F0B00 AS Date))
INSERT [dbo].[_admin] ([id], [password], [username], [jid], [gender], [age], [isSuperAdmin], [regDay]) VALUES (N'coo', N'c6f057b86584942e415435ffb1fa93d4', N'Martin', N'000003', N'male', 20, 0, CAST(0x9B3F0B00 AS Date))
/****** Object:  Table [dbo].[_order]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[_order](
	[orderId] [int] NOT NULL,
	[isdelivered] [varchar](20) NOT NULL,
	[isreceived] [varchar](20) NOT NULL,
	[jid] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[orderId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[_order] ([orderId], [isdelivered], [isreceived], [jid]) VALUES (100073, N'yes', N'yes', N'000001')
INSERT [dbo].[_order] ([orderId], [isdelivered], [isreceived], [jid]) VALUES (100077, N'yes', N'yes', N'000001')
INSERT [dbo].[_order] ([orderId], [isdelivered], [isreceived], [jid]) VALUES (100083, N'yes', N'yes', N'000001')
INSERT [dbo].[_order] ([orderId], [isdelivered], [isreceived], [jid]) VALUES (100084, N'yes', N'yes', N'000001')
INSERT [dbo].[_order] ([orderId], [isdelivered], [isreceived], [jid]) VALUES (100085, N'no', N'no', NULL)
INSERT [dbo].[_order] ([orderId], [isdelivered], [isreceived], [jid]) VALUES (100086, N'no', N'no', NULL)
/****** Object:  Trigger [afterOrder]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[afterOrder]
on [dbo].[shopCart]
after update
as
if update(isfirmed)
  begin
    declare @OI varchar(20);
    select @OI=orderId from inserted;
    insert into _order(orderId) values(@OI);
  end
GO
/****** Object:  Table [dbo].[bookWanted]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bookWanted](
	[title] [varchar](20) NOT NULL,
	[author] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[title] ASC,
	[author] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[bookWanted] ([title], [author]) VALUES (N'红楼梦', N'曹雪芹')
INSERT [dbo].[bookWanted] ([title], [author]) VALUES (N'数据库系统概论', N'忘记了')
INSERT [dbo].[bookWanted] ([title], [author]) VALUES (N'水浒传', N'施耐庵')
/****** Object:  Table [dbo].[sale]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sale](
	[saleId] [int] IDENTITY(200000,1) NOT NULL,
	[orderId] [int] NOT NULL,
	[otime] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[saleId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[sale] ON
INSERT [dbo].[sale] ([saleId], [orderId], [otime]) VALUES (200005, 100073, CAST(0x973F0B00 AS Date))
INSERT [dbo].[sale] ([saleId], [orderId], [otime]) VALUES (200006, 100077, CAST(0x9F3F0B00 AS Date))
INSERT [dbo].[sale] ([saleId], [orderId], [otime]) VALUES (200007, 100083, CAST(0x9F3F0B00 AS Date))
INSERT [dbo].[sale] ([saleId], [orderId], [otime]) VALUES (200008, 100084, CAST(0x9F3F0B00 AS Date))
SET IDENTITY_INSERT [dbo].[sale] OFF
/****** Object:  Trigger [afterReceive]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[afterReceive]
on [dbo].[_order]
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
/****** Object:  Trigger [changeDiscount]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[changeDiscount]
on [dbo].[customer]
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
GO
/****** Object:  View [dbo].[queryShopCart]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[queryShopCart]
as select S.orderId,C.customerId,B.title,S.quantity,B.sprice,C.discount,S.amount
from shopCart S,book B,customer C
where S.isbn=B.isbn and C.customerId = S.customerId and S.isfirmed='no';
GO
/****** Object:  Trigger [afterSale]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[afterSale]
on [dbo].[sale]
after insert
as 
BEGIN 
declare @OI varchar(20);
select @OI=orderId from inserted;
update book
set inventory=inventory-(select quantity from alljoin where orderId=@OI)
where isbn=(select isbn from alljoin where orderId=@OI)
end

--在stock插入一条数据之后，更新库存数
GO
/****** Object:  Table [dbo].[stock]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[stock](
	[stockId] [int] IDENTITY(300000,1) NOT NULL,
	[jid] [varchar](20) NOT NULL,
	[isbn] [varchar](20) NOT NULL,
	[quantity] [int] NOT NULL,
	[amount] [numeric](6, 2) NOT NULL,
	[time] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[stockId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[stock] ON
INSERT [dbo].[stock] ([stockId], [jid], [isbn], [quantity], [amount], [time]) VALUES (300004, N'000001', N'9787544267618', 5, CAST(131.00 AS Numeric(6, 2)), CAST(0x973F0B00 AS Date))
INSERT [dbo].[stock] ([stockId], [jid], [isbn], [quantity], [amount], [time]) VALUES (300005, N'000001', N'9787544772976', 2, CAST(50.20 AS Numeric(6, 2)), CAST(0x973F0B00 AS Date))
INSERT [dbo].[stock] ([stockId], [jid], [isbn], [quantity], [amount], [time]) VALUES (300006, N'000001', N'978754428I3138', 1, CAST(29.60 AS Numeric(6, 2)), CAST(0x973F0B00 AS Date))
INSERT [dbo].[stock] ([stockId], [jid], [isbn], [quantity], [amount], [time]) VALUES (300008, N'000001', N'9787040419085', 5, CAST(190.00 AS Numeric(6, 2)), CAST(0x973F0B00 AS Date))
INSERT [dbo].[stock] ([stockId], [jid], [isbn], [quantity], [amount], [time]) VALUES (300009, N'000001', N'9787040419085', 5, CAST(190.00 AS Numeric(6, 2)), CAST(0x9B3F0B00 AS Date))
INSERT [dbo].[stock] ([stockId], [jid], [isbn], [quantity], [amount], [time]) VALUES (300010, N'000001', N'9787544772976', 3, CAST(75.30 AS Numeric(6, 2)), CAST(0x9F3F0B00 AS Date))
INSERT [dbo].[stock] ([stockId], [jid], [isbn], [quantity], [amount], [time]) VALUES (300011, N'000001', N'9787214070456', 9, CAST(388.80 AS Numeric(6, 2)), CAST(0x9F3F0B00 AS Date))
INSERT [dbo].[stock] ([stockId], [jid], [isbn], [quantity], [amount], [time]) VALUES (300012, N'000001', N'89986976', 5, CAST(440.00 AS Numeric(6, 2)), CAST(0x9F3F0B00 AS Date))
SET IDENTITY_INSERT [dbo].[stock] OFF
/****** Object:  View [dbo].[queryUnpaid]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[queryUnpaid]
as select isbn,title,author,iprice,inventory,unpaid
from book
where unpaid>0
GO
/****** Object:  Trigger [afterStock]    Script Date: 05/12/2019 17:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create trigger [dbo].[afterStock]
on [dbo].[stock]
after insert AS
BEGIN
update book
set inventory=inventory+(select quantity from inserted),unpaid=0
where isbn=(select isbn from inserted)
end
GO
/****** Object:  Default [DF__book__inventory__145C0A3F]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[book] ADD  DEFAULT ((0)) FOR [inventory]
GO
/****** Object:  Default [DF__book__unpaid__15502E78]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[book] ADD  DEFAULT ((0)) FOR [unpaid]
GO
/****** Object:  Default [DF__customer__signTi__07F6335A]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[customer] ADD  DEFAULT (getdate()) FOR [signTime]
GO
/****** Object:  Default [DF__customer__accCon__08EA5793]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[customer] ADD  DEFAULT ((0)) FOR [accCon]
GO
/****** Object:  Default [DF__customer__discou__09DE7BCC]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[customer] ADD  DEFAULT ((0.90)) FOR [discount]
GO
/****** Object:  Default [DF__shopCart__isfirm__1FCDBCEB]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[shopCart] ADD  DEFAULT ('no') FOR [isfirmed]
GO
/****** Object:  Default [DF__shopCart__time__20C1E124]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[shopCart] ADD  DEFAULT (getdate()) FOR [time]
GO
/****** Object:  Default [DF___admin__isSuperA__014935CB]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[_admin] ADD  DEFAULT ((0)) FOR [isSuperAdmin]
GO
/****** Object:  Default [DF___admin__regDay__023D5A04]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[_admin] ADD  DEFAULT (getdate()) FOR [regDay]
GO
/****** Object:  Default [DF___order__isdelive__286302EC]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[_order] ADD  DEFAULT ('no') FOR [isdelivered]
GO
/****** Object:  Default [DF___order__isreceiv__29572725]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[_order] ADD  DEFAULT ('no') FOR [isreceived]
GO
/****** Object:  Default [DF__sale__time__300424B4]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[sale] ADD  DEFAULT (getdate()) FOR [otime]
GO
/****** Object:  Default [DF__stock__time__35BCFE0A]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[stock] ADD  DEFAULT (getdate()) FOR [time]
GO
/****** Object:  Check [CK__book__inventory__164452B1]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[book]  WITH CHECK ADD CHECK  (([inventory]>=(0)))
GO
/****** Object:  Check [CK__customer__discou__0BC6C43E]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[customer]  WITH CHECK ADD CHECK  (([discount]=(0.75) OR [discount]=(0.80) OR [discount]=(0.90)))
GO
/****** Object:  Check [CK__customer__gender__0AD2A005]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[customer]  WITH CHECK ADD CHECK  (([gender]='male' OR [gender]='female'))
GO
/****** Object:  Check [CK__shopCart__quanti__239E4DCF]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[shopCart]  WITH CHECK ADD CHECK  (([quantity]>=(1)))
GO
/****** Object:  Check [CK___admin__gender__03317E3D]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[_admin]  WITH CHECK ADD CHECK  (([gender]='male' OR [gender]='female'))
GO
/****** Object:  ForeignKey [FK__book__categoryId__173876EA]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[book]  WITH CHECK ADD FOREIGN KEY([categoryId])
REFERENCES [dbo].[categoryInfo] ([categoryId])
ON DELETE CASCADE
GO
/****** Object:  ForeignKey [FK__shopCart__custom__22AA2996]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[shopCart]  WITH CHECK ADD FOREIGN KEY([customerId])
REFERENCES [dbo].[customer] ([customerId])
GO
/****** Object:  ForeignKey [FK__shopCart__isbn__21B6055D]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[shopCart]  WITH CHECK ADD FOREIGN KEY([isbn])
REFERENCES [dbo].[book] ([isbn])
GO
/****** Object:  ForeignKey [FK___order__jid__2A4B4B5E]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[_order]  WITH CHECK ADD FOREIGN KEY([jid])
REFERENCES [dbo].[_admin] ([jid])
GO
/****** Object:  ForeignKey [FK___order__orderId__2B3F6F97]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[_order]  WITH CHECK ADD FOREIGN KEY([orderId])
REFERENCES [dbo].[shopCart] ([orderId])
GO
/****** Object:  ForeignKey [FK__sale__orderId__30F848ED]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[sale]  WITH CHECK ADD FOREIGN KEY([orderId])
REFERENCES [dbo].[_order] ([orderId])
GO
/****** Object:  ForeignKey [FK__stock__isbn__37A5467C]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[stock]  WITH CHECK ADD FOREIGN KEY([isbn])
REFERENCES [dbo].[book] ([isbn])
GO
/****** Object:  ForeignKey [FK__stock__jid__36B12243]    Script Date: 05/12/2019 17:05:33 ******/
ALTER TABLE [dbo].[stock]  WITH CHECK ADD FOREIGN KEY([jid])
REFERENCES [dbo].[_admin] ([jid])
GO
