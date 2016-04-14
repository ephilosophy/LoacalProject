angular.module('productModule')
.controller('productCreateController',productCreateController);

productCreateController.$inject = ['$scope', '$timeout','requireFieldValidationService', 'productService'];

function productCreateController($scope, $timeout, requireFieldValidationService, productService){
	$scope.product = {
		name:"",
		productCost:"",
		productCategoryId:"",
		productPrice:0.00,
		description:"",
		productId:"",
		categoryDetails:"",
		createdDt:new Date()
	}

	$scope.productCategories = [];

	getProductCategories();

	function getProductCategories(){
		productService.getAllProductCategories()
		.success(function(data){
			if(data && data.productCategories 
				&& data.productCategories.length>0){
				$scope.productCategories = data.productCategories;
			}
		})
	}

	$scope.message = {
		containsSuccessfulMessage:false,
		successfulMessage:""
	};

	$scope.validationResult = {
		containsValidationError:false,
		validationSummary:""
	};

	function clearProduct(){
		for (var productProperty in $scope.product){
			if($scope.product.hasOwnProperty(productProperty)){
				if(typeof (productProperty) == "string"){
					$scope.product[productProperty] = '';
				}
			}
		}	
	}

	function clearMessage(){
		$scope.message.containsSuccessfulMessage = false;
		$scope.message.successfulMessage = "";		
	}

	function displayMessage(){
		$scope.message.containsSuccessfulMessage = true;
		$scope.message.successfulMessage = "A record was added successfully";		
	}

	$scope.createProduct = function(product){
		console.log("Hello to gitHUB");
		var validationMessages = requireFieldValidationService.getRequiredFieldValidationErrorMessage(
		[
		{name:$scope.product.name || "", errorMessage:'Please enter product name'},
		{name:$scope.product.productCost || "", errorMessage:'Please enter product cost'},
		{name:$scope.product.productCategoryId || "", errorMessage:'Please select product category'},
		{name:$scope.product.productPrice || "", errorMessage:'Please enter product selling price'},
		{name:$scope.product.description || "", errorMessage:'Please enter product description'}		
		]);

		if(validationMessages.length>0){

			//console.log("validationMessages inside if",validationMessages);
			$scope.validationResult.containsValidationError = true;

			angular.element('#validationErrorMessage').empty();

			validationMessages.forEach(function(errorMessage){
				angular.element("<li></li>").html(errorMessage).appendTo('#validationErrorMessage');
			});

		} else{
			$scope.validationResult.containsValidationError = false;
			productService.createProduct($scope.product)
			.success(function(data){
				if(data && data.status == "Successful")
				console.log("data CALLED",data);
				displayMessage();
				$timeout(function afterTimeOut(){
					clearMessage();
					clearProduct();
				},3000);
			})
		}
	}
}