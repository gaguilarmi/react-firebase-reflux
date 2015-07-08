var React = require('react');
var FilterableProductTable =  require('./components/FilterableProductTable');

var request =  require('superagent');
var url = 'https://www.googleapis.com/books/v1/volumes';

var Firebase = require("firebase");

// // var base = Rebase.createClass('https://react-mi.firebaseio.com/');
var myFirebaseRef = new Firebase('https://react-mi.firebaseio.com/');

myFirebaseRef.child('books').on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// request
// 	.get(url)
// 	.query({q:'"Node+js"', filter:'paid-ebooks'})
// 	.end(function(err, res){
// 		var body = res.body.items;
// 		console.log(body);
// 		var data = {};
// 		body.forEach(function(obj){
// 			var volumeInfo = obj.volumeInfo;
// 			var data = {
// 				title: volumeInfo.title,
// 				language: volumeInfo.language,
// 				publisher: volumeInfo.publisher,
// 				authors: volumeInfo.authors,
// 				listPrice: obj.saleInfo.listPrice
// 			};

// 			myFirebaseRef.child('books/nodejs').push(data);
// 		});
// 	});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

React.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('container'));