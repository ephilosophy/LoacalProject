var connectionProvider = require('../database/connection.js');

var productDb = {

	createProduct : function(product, onSuccessful){

		//console.log("product",product);
		var insertStatement = 'INSERT INTO product SET?';

		var productToBeAdded = {
			ProductCategory_FK:product.productCategoryId,
			Name:product.name,
			ProductPrice:product.productPrice,
			Description:product.description,
			ProductCost:product.productCost,
			CreatedDt:new Date(),
			IsActive:true
		}
		
		var connection = connectionProvider.connectionStringProvider.getSqlConnection();
		console.log("connection in productCategoryDb.js",connection);
		if(connection){

			connection.query(insertStatement, productToBeAdded, function(err, result){

				if(err){

					console.log(err);
				}

				onSuccessful({status : 'Successful'});
				console.log(result); 
			});

			connectionProvider.connectionStringProvider.closeSqlConnection(connection);
		}
	},

	getAllProducts:function(callback){
		console.log("in getAllProducts of productDb");
		var selectStatement = 'SELECT pc.categoryName, pc.id AS ProductCategoryId,p.id AS ProductId, p.Name, p.Description, p.ProductCost, p.ProductPrice, p.CreatedDt,	p.IsActive, SUBSTRING( p.Description, 1, 100 ) AS PartialDescription FROM productcategory pc INNER JOIN product p ON p.ProductCategory_FK = pc.id ORDER BY p.CreatedDt';
		var connection = connectionProvider.connectionStringProvider.getSqlConnection();

		if(connection){
			connection.query(selectStatement, function(err, rows, fields){
				if(err){ throw err; }
				//console.log("database result",rows);
				callback(rows);
			});

			connectionProvider.connectionStringProvider.closeSqlConnection(connection);
		}
	}

}
	
exports.productDb = productDb;