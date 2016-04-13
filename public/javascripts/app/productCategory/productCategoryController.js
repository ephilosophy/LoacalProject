angular.module("productCategoryModule")
.controller("productCategoryController",productCategoryController);

productCategoryController.$inject = ['$scope','$timeout','productCategoryService','requireFieldValidationService'];

function productCategoryController($scope, $timeout, productCategoryService, requireFieldValidationService){
	$scope.productCategory = {
		categoryName: "",
		categoryDetails: ""
	};

	$scope.message = {
		containsSuccessfulMessage:false,
		successfulMessage:""
	};

	$scope.validationResult = {
		containsValidationError:false,
		validationSummary:""
	};

	function clearProductCategory(){
		$scope.productCategory.categoryName="";
		$scope.productCategory.categoryDetails="";
	}

	function clearMessage(){
		$scope.message.containsSuccessfulMessage = false;
		$scope.message.successfulMessage = "";		
	}

	function displayMessage(){
		$scope.message.containsSuccessfulMessage = true;
		$scope.message.successfulMessage = "A record was added successfully";		
	}

	$scope.createProductCategory = function(productCategory){
		//console.log("createProductCategory")
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
			productCategoryService.createProductCategory(productCategory)
			.success(function(data){
				if(data && data.status == "Successful")
				console.log("data CALLED",data);
				displayMessage();
				$timeout(function afterTimeOut(){
					clearMessage();
					clearProductCategory();
				},3000);
			})
		}
	}
}
