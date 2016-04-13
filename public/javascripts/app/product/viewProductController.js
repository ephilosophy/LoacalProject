angular.module('productModule')
.controller('viewProductController',viewProductController);

viewProductController.$inject = ['$scope','$timeout','productService','requireFieldValidationService'];

function viewProductController($scope,$timeout,productService,requireFieldValidationService){
	$scope.products = [];

	populateProducts();

	function populateProducts(){
		productService.getAllProducts()
		.success(function(status){
			console.log("status in populateProducts",status);
			$scope.products = status.products;
		})
	}
}