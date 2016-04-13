function productCategoryRouteConfig(app){
	this.app = app;
	this.routeTable = [];
	this.init();
}

productCategoryRouteConfig.prototype.init = function(){
	var self = this;
	this.addRoutes();
	this.processRoutes();
}

productCategoryRouteConfig.prototype.processRoutes = function(){
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

productCategoryRouteConfig.prototype.addRoutes = function(){
	var self = this;
	self.routeTable.push({
		requestType: 'get',
		requestUrl: '/createProductCategory',
		callbackFunction: function(req, res){
			res.render('createProductCategory',{title:'Create Product Category'});
		}
	});

	self.routeTable.push({
		requestType: 'post',
		requestUrl: '/api/createProductCategory',
		callbackFunction: function(req, res){
			console.log("Post called");
			//res.render('createProductCategory');
			// console.log("req.body",req);
			
		     var productCategoryDb = require('../database/productCategoryDb.js'); 
		     //.log("production ",productCategoryDb);
		     //res.send("data image");
			 console.log("productCategoryDb post",productCategoryDb);
			// console.log("hello from createProductCategory post");
			console.log("req.body",req.body);

			productCategoryDb.productCategoryDb.createProductCategory(req.body, function(status){
				if(status)
					res.json(status);
				console.log(status);
			});
		}
	});

	self.routeTable.push({
		requestType: 'post',
		requestUrl: '/api/editProductCategory',
		callbackFunction: function(req, res){
			console.log("edit Post called");
			//res.render('createProductCategory');
			// console.log("req.body",req);
			
		     var productCategoryDb = require('../database/productCategoryDb.js'); 
		     //.log("production ",productCategoryDb);
		     //res.send("data image");
			 //console.log("productCategoryDb post",productCategoryDb);
			// console.log("hello from createProductCategory post");
			console.log("req.body",req.body);

			productCategoryDb.productCategoryDb.editProductCategory(req.body, function(status){
				if(status)
					res.json(status);
				console.log(status);
			});
		}
	});

	self.routeTable.push({
		requestType: 'delete',
		requestUrl: '/api/deleteProductCategoryById/:productCategoryId',
		callbackFunction: function(req, res){
			//console.log("edit Post called");			
		    var productCategoryDb = require('../database/productCategoryDb.js'); 
			//console.log("req.body",req.body);

			productCategoryDb.productCategoryDb.deleteProductCategoryById(req.params.productCategoryId, function(status){
				if(status)
					res.json(status);
				console.log(status);
			});
		}
	});

	self.routeTable.push({
		requestType: 'get',
		requestUrl: '/viewProductCategory',
		callbackFunction: function(req, res){
			res.render('viewProductCategory',{title:'View Product Category'});
		}
	});

	self.routeTable.push({
		requestType: 'get',
		requestUrl: '/api/getAllProductCategory',
		callbackFunction: function(req, res){
			//console.log("hello from getAllProductCategory");
			var productCategoryDb = require('../database/productCategoryDb');
			//console.log("productCategoryDb",productCategoryDb);
			productCategoryDb.productCategoryDb.getAllProductCategory(
				function (productCategories){
					//console.log("productCategories+++++++++++++",productCategories);
					res.json({productCategories : productCategories});
				}
			);
		}
	});

	self.routeTable.push({
		requestType: 'get',
		requestUrl: '/editProductCategory/:productCategoryId',
		callbackFunction: function(req, res){
			res.render('editProductCategory',{title:'Edit Product Category'});
		}
	});

	self.routeTable.push({
		requestType: 'get',
		requestUrl: '/api/getProductCategoryById/:productCategoryId',
		callbackFunction: function(req, res){
			//console.log("hello from getAllProductCategory");
			var productCategoryDb = require('../database/productCategoryDb');
			//console.log("productCategoryDb",productCategoryDb);
			productCategoryDb.productCategoryDb.getProductCategoryById(req.params.productCategoryId,
				function (productCategories){
					//console.log("productCategories+++++++++++++",productCategories);
					res.json({productCategories : productCategories});
				}
			);
		}
	});
}

module.exports = productCategoryRouteConfig;