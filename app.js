var express = require("express"),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    ejs = require('ejs'),
    session = require("express-session"),
    book = require("./models/booklist");

var app = express();
app.set('views','./views'); 
app.engine(".html",ejs.__express);
app.set("view engine","html"); 

// 连接数据库
mongoose.connect('mongodb://10.7.182.53:27017/book');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("链接数据成功！");
});

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("static")) 

// 获取数据库信息
app.get("/book",function(req,res){
	res.render("book")
})
// app.get("/book",function(req,res){
// 	res.render("in")
// })
app.post("/book",function(req,res){
	var body = req.body;
	book.find({},function(err,booklist){
		if(err) return console.error(err);
		res.json({booklist:booklist})
	})
})

// 修改数据库
app.post("/update",function(req,res){
	var body = req.body;
	console.log(body);
	book.update({_id:body._id},{$set:{name:body.name,book:body.book,price:body.price}},function(err,doc){
		// res.json({msg:0})
		res.json({msg:0})
	})
})

// 增加
app.post("/add",function(req,res){
	var body = req.body;
	var addBook = new book({
		book : body.book,
		name : body.name,
		price : body.price
	})
	addBook.save(function(err,doc){
		if(err){
			console.log(err)
		}else{
			console.log("success")
			res.json({msg:0})
		}
	})
})

// 删除
app.post("/delete",function(req,res){
	var body = req.body;
	console.log(body)
	book.remove({_id:body._id},function(err,doc){})
	res.json({msg:0})
})

//起服务
app.listen(8090,function(){
	console.log("启动成功")
})