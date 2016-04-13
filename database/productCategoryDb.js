var connectionProvider = require('../database/connection.js');
//console.log("connectionProvider",connectionProvider);
var productCategoryDb = {

	createProductCategory : function(productCategory, onSuccessful){

		var insertStatement = 'INSERT INTO productcategory SET?';

		var category = {
			categoryName : productCategory.categoryName,
			Details : productCategory.details,
			isValid : productCategory.isValid,
			CreatedDate : new Date()
		}
		
		var connection = connectionProvider.connectionStringProvider.getSqlConnection();
		console.log("connection in productCategoryDb.js",connection);
		if(connection){

			connection.query(insertStatement, category, function(err, result){

				if(err){

					console.log(err);
				}

				onSuccessful({status : 'Successful'});
				console.log(result); 
			});

			connectionProvider.connectionStringProvider.closeSqlConnection(connection);
		}
	},

	getAllProductCategory : function(callback){
		var connection = connectionProvider.connectionStringProvider.getSqlConnection();
		//console.log("connection in getAllProductCategory");
		var selectStatement = 'SELECT * FROM productcategory ORDER BY id DESC';

		if(connection){
			connection.query(selectStatement, function(err, rows, fields){
				if(err){ throw err; }
				//console.log("database result",rows);
				callback(rows);
			});

			connectionProvider.connectionStringProvider.closeSqlConnection(connection);
		}
	},

	getProductCategoryById : function(productCategoryId, callback){
		console.log("productCategoryId",productCategoryId);
		var connection = connectionProvider.connectionStringProvider.getSqlConnection();
		console.log("connection in getProductCategoryById");
		var selectStatement = 'SELECT * FROM productcategory WHERE id = ?';
		//var selectStatement = 'SELECT * FROM productcategory ORDER BY id DESC';
		if(connection){

			console.log("connection is in if");
			connection.query(selectStatement,[productCategoryId], function(err, rows, fields){
				if(err){ console.log("err in getProductCategoryById",err);}
				//console.log("database result",rows);
				callback(rows);
			});

			connectionProvider.connectionStringProvider.closeSqlConnection(connection);
		}
	},

	editProductCategory : function(productCategory, onSuccessful){

		var updateStatement = 'UPDATE productcategory SET ? WHERE id = ?';

		var category = {			
			categoryName : productCategory.categoryName,
			Details : productCategory.details,
			isValid : productCategory.isValid,
			ModifiedDate : new Date()
		}
		
		var connection = connectionProvider.connectionStringProvider.getSqlConnection();
		console.log("connection in productCategoryDb.js",connection);
		if(connection){

			connection.query(updateStatement, [category, productCategory.id], function(err, result){

				if(err){

					console.log(err);
				}

				onSuccessful({status : 'Successful'});
				console.log(result); 
			});

			connectionProvider.connectionStringProvider.closeSqlConnection(connection);
		}
	},

	deleteProductCategoryById : function(productCategoryId, callback){
		console.log("deleteProductCategoryById in database",productCategoryId);
		var connection = connectionProvider.connectionStringProvider.getSqlConnection();
		//console.log("connection in getProductCategoryById");
		var deleteStatement = 'DELETE FROM productcategory WHERE id = ?';
		//var selectStatement = 'SELECT * FROM productcategory ORDER BY id DESC';
		if(connection){

			console.log("connection is in if");
			connection.query(deleteStatement,[productCategoryId], function(err, rows, fields){
				if(err){ console.log("err in getProductCategoryById",err);}
				//console.log("database result",rows);
				if(rows){
					callback({status:"Successful"});					
				}
			});

			connectionProvider.connectionStringProvider.closeSqlConnection(connection);
		}
	}

}

exports.productCategoryDb = productCategoryDb;
