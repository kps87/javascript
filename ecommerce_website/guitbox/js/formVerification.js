// utility function used to verify if
// a form verification has had all the appropriate
// fields entered, and which changes the styles correspondingly
// returns a boolean if any payment field has not been filled out
function isMissingFields(requiredFields){

	var isMissingFields;
	for(i in requiredFields){
		var field = document.getElementById(requiredFields[i]);
		if(field.value == ""){
			isMissingFields = true;
			if(field.nodeName != "SELECT"){
				field.className = "form-control mb-3 p-3 bg-warning";
			}
		}
		else{
			if(field.nodeName != "SELECT"){
				var field = document.getElementById(requiredFields[i]);
				field.className = "form-control mb-3 p-3 text-success";
			}
		}
	}
	if(isMissingFields){
		return true;
	}
	return false;
}


