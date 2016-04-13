angular.module('productModule')
.factory('productService',productService);

productService.$inject = ['$http', '$location', 'productCategoryService'];

function productService($http, $location, productCategoryService){
	return {
		createProduct:function(product){
			return $http.post('/api/createProduct',
				{
					productCategoryId:product.productCategoryId,
					name:product.name,
					productPrice:product.productPrice,
					description:product.description,
					productCost:product.productCost
				});
		},
		getAllProductCategories:function(){
			return productCategoryService.getAllProductCategories();
		},
		getAllProducts:function(){
			//console.log("get All products called");
			return $http.get('/api/getAllProducts');
		},
		getIdFromEndPoint:function(){
			var absoluteUrl = $location.absUrl();
			var segments = absoluteUrl.split("/");
			var productCategoryId = segments[segments.length - 1];
			return productCategoryId;
		}
	}
}