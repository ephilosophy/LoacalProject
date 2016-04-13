angular.module('productCategoryModule')
.controller('viewProductCategoryController',viewProductCategoryController);

viewProductCategoryController.$inject = ['$scope', '$timeout', 'productCategoryService'];

function viewProductCategoryController($scope, $timeout, productCategoryService){
	$scope.productCategories = [];

	getAllProductCategories();

	function getAllProductCategories(){
		productCategoryService.getAllProductCategories()
		.success(function (data){
			//console.log("data getAllProductCategories",data.productCategories)
			if(data && data.productCategories && data.productCategories.length>0){
				//console.log("I am inside if");
				$scope.productCategories = data.productCategories;
			}
		})
	}

	$scope.currentProductCategoryId = 0;

	$scope.setCurrentProductCategoryId = function(productCategoryId){
		$scope.currentProductCategoryId = productCategoryId;
	}

	$scope.deleteProductCategory = function(){
		if($scope.currentProductCategoryId > 0){
			console.log("deleteProductCategory called",$scope.currentProductCategoryId);
			productCategoryService.deleteProductCategoryById($scope.currentProductCategoryId)
			.success(function(data){
				if(data && data.status && data.status == "Successful"){
					window.location.href = '/viewProductCategory'
				}
			});
		}
	}
}