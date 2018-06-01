const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/test";
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, '1.仿google.suggset之browser.html'));
});

app.get('/search', (req, res) => {
	//获取关键字
	let keyword = req.query.keyword.trim();
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		//获取search集合
		let search = db.collection('search');
		// 创建正则表达式
		let reg = new RegExp("^" + keyword, 'i');
		search.find({
			keyword: reg
		}, {
			_id: 0
		}).toArray((err, result) => {
			if (err) throw err;
			res.json(result);
		});
	});
});

app.listen(4000, () => {
	console.log('4000 ok....');
});