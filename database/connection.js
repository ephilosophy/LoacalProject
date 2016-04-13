
//console.log("mysql",mysql);

var connectionStringProvider = {
	getSqlConnection:function(){
		var mysql = require('mysql');
		var mysqlConnectionString = require('../database/connectionString.js');
		var connection = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connectionString);
		//console.log("connection",connection);

		connection.connect(function(err){
			if(err){
				throw err;
			} else{
				console.log("connection was successful");
			}
		});

		return connection;
	},
	closeSqlConnection:function(currentConnection){
		currentConnection.end(function(err){
			if(err){
				throw err;
			} else{
				console.log("Disconnected");
			}
		})
	}
}

exports.connectionStringProvider = connectionStringProvider;