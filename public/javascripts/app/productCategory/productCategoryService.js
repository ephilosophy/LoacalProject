angular.module("productCategoryModule")
.factory("productCategoryService",productCategoryService);

productCategoryService.$inject = ['$http', '$location'];

function productCategoryService($http, $location){
	return {
		createProductCategory:function(productCategory){
			//console.log("createProductCategory in service called",productCategory);
			return $http.post('/api/createProductCategory',
				{
					categoryName:productCategory.categoryName,
					details:productCategory.categoryDetails,
					isValid:true
				}
			);
		},
		editProductCategory:function(productCategory, productCategoryId){
			console.log("editProductCategory in service called",productCategory);
			return $http.post('/api/editProductCategory',
				{
					id:productCategoryId,
					categoryName:productCategory.categoryName,
					details:productCategory.categoryDetails,
					isValid:true
				}
			);
		},
		getAllProductCategories:function(){
			return $http.get('/api/getAllProductCategory');
		},
		getIdFromEndPoint:function(){
			var absoluteUrl = $location.absUrl();
			var segments = absoluteUrl.split("/");
			var productCategoryId = segments[segments.length - 1];
			return productCategoryId;
		},
		getProductCategoryById:function(productCategoryId){
			return $http.get('/api/getProductCategoryById/'+productCategoryId)
		},
		deleteProductCategoryById:function(productCategoryId){
			console.log("deleteProductCategoryById in service",productCategoryId);
			//return $http.delete('/api/deleteProductCategoryById/'+productCategoryId);			
			return $http['delete']('/api/deleteProductCategoryById/'+productCategoryId); // works in all browser
		}

	}
}
