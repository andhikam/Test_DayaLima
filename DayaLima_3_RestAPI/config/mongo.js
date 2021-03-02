const { MongoClient } = require('mongodb');
const url =
	'mongodb+srv://test_DayaLima:DayaLimaPassword@cluster0.n63pf.mongodb.net/dbDayaLima?retryWrites=true&w=majority';
const client = new MongoClient(url, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

module.exports = client;
