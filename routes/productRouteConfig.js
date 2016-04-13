function productRouteConfig(app){
	this.app = app;
	this.routeTable = [];
	this.init();
}

productRouteConfig.prototype.init = function(){
	var self = this;
	this.addRoutes();
	this.processRoutes();
}

productRouteConfig.prototype.processRoutes = function(){
	var self = this;
	self.routeTable.forEach(function(route){
		if(route.requestType == 'get'){
			//console.log("requestType",route.requestType)
			self.app.get(route.requestUrl,route.callbackFunction); 
		} else if(route.requestType == 'post'){
			//console.log("requestType",route.requestType);
			self.app.post(route.requestUrl,route.callbackFunction);
		} else if(route.requestType == 'delete'){
			//console.log("requestType",route.requestType);
			self.app.delete(route.requestUrl,route.callbackFunction);
		}

	});
}

productRouteConfig.prototype.addRoutes = function(){
	var self = this;
	self.routeTable.push({
		requestType: 'get',
		requestUrl: '/createProduct',
		callbackFunction: function(req, res){
			res.render('createProduct',{title:'Create Product'});
		}
	});

	self.routeTable.push({
		requestType: 'get',
		requestUrl: '/viewProduct',
		callbackFunction: function(req, res){
			res.render('viewProduct',{title:'View Product'});
		}
	});

	self.routeTable.push({
		requestType: 'get',
		requestUrl: '/api/getAllProducts',
		callbackFunction: function(req, res){
			console.log("getAllProducts in server called");
			var productDb = require('../database/productDb.js');
			console.log("productDb in getAllProducts",productDb);
			productDb.productDb.getAllProducts(function(products){
				if(products)
					res.json({products:products});
			}); 
		}
	});

	self.routeTable.push({
		requestType: 'post',
		requestUrl: '/api/createProduct',
		callbackFunction: function(req, res){
			console.log("Post called");
			//res.render('createProductCategory');
			// console.log("req.body",req);
			
		     var productDb = require('../database/productDb.js'); 
		     //.log("production ",productCategoryDb);
		     //res.send("data image");
			 console.log("productCategoryDb post",productDb);
			// console.log("hello from createProductCategory post");
			console.log("req.body",req.body);

			productDb.productDb.createProduct(req.body, function(status){
				if(status)
					res.json(status);
				console.log(status);
			});
		}
	});
}

module.exports = productRouteConfig;
