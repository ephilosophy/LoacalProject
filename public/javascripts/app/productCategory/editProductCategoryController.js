angular.module('productCategoryModule')
.controller('editProductCategoryController',editProductCategoryController);

editProductCategoryController.$inject = ['$scope', '$timeout', 'productCategoryService', 'requireFieldValidationService'];

function editProductCategoryController($scope, $timeout, productCategoryService, requireFieldValidationService){
	$scope.productCategory = {
		categoryName: "",
		categoryDetails: ""
	}

	$scope.message = {
		containsSuccessfulMessage:false,
		successfulMessage:""
	};

	$scope.validationResult = {
		containsValidationError:false,
		validationSummary:""
	};

	function clearMessage(){
		$scope.message.containsSuccessfulMessage = false;
		$scope.message.successfulMessage = "";		
	}

	function displayMessage(){
		$scope.message.containsSuccessfulMessage = true;
		$scope.message.successfulMessage = "This record was updated successfully";		
	}

	function bindView(productCategory){
		$scope.productCategory.categoryName = productCategory.categoryName;
		$scope.productCategory.categoryDetails = productCategory.Details;		
	}

	getProductCategoryById();

	function getProductCategoryById(){
		productCategoryService.getProductCategoryById(productCategoryService.getIdFromEndPoint())
		.success(function (data){
			//console.log("data getAllProductCategories",data.productCategories)
			if(data && data.productCategories && data.productCategories.length>0){
				//console.log("I am inside if");
				//$scope.productCategories = data.productCategories;
				bindView(data.productCategories[0]);
			}
		})
	}

	$scope.editProductCategory = function(productCategory){
		
		var validationMessages = requireFieldValidationService.getRequiredFieldValidationErrorMessage(
		[
		{name:$scope.productCategory.categoryName || "", errorMessage:'Please enter product category name'},
		{name:$scope.productCategory.categoryDetails || "", errorMessage:'Please enter product category detail'}
		]);


		//console.log("validationMessages",validationMessages);
		if(validationMessages.length>0){

			//console.log("validationMessages inside if",validationMessages);
			$scope.validationResult.containsValidationError = true;

			angular.element('#validationErrorMessage').empty();

			validationMessages.forEach(function(errorMessage){
				angular.element("<li></li>").html(errorMessage).appendTo('#validationErrorMessage');
			});

		} else{

			$scope.validationResult.containsValidationError = false;
			var productCategoryId = productCategoryService.getIdFromEndPoint();
			console.log("editProductCategory id",productCategoryId);
			productCategoryService.editProductCategory(productCategory, productCategoryId)
			.success(function(data){
				if(data && data.status == "Successful")
				console.log("data CALLED",data);
				displayMessage();
				$timeout(function afterTimeOut(){
					clearMessage();					
				},3000);
			})
		}
	}
}