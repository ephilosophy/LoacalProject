angular.module("productCategoryModule")
.factory("requireFieldValidationService",requireFieldValidationService);

function requireFieldValidationService () {
	function _getRequireValidationMessage(requireInfos){
		//console.log("_getRequireValidationMessage called in the service");
		var errorMessages = [];
		if (requireInfos.length>0){
			requireInfos.forEach(function(requireInfo){
				if(requireInfo.name !== 'undefined'

					&&
					(requireInfo.name === null || requireInfo.name == '' || requireInfo.name.length == 0)){
					errorMessages.push(requireInfo.errorMessage);
				}
			});
		}
		return errorMessages;
	}
	 //console.log("requireFieldValidationService")
	 // return {"data" : "adsf"}
	return {getRequiredFieldValidationErrorMessage : _getRequireValidationMessage}
}