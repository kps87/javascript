// function which creates main div for a generic modal
function createModalDiv(id){

	// create main div
	var modal = document.createElement("div");
	modal.className = "modal";
	modal.id = id;
	modal.setAttribute("tabindex", "-1");
	modal.setAttribute("role", "dialog");
	modal.setAttribute("aria-labelledby", "exampleModalLabel");
	modal.setAttribute("style", "display:none");
	modal.setAttribute("aria-hidden", "true");
	modal.setAttribute("data-backdrop", "static");
	modal.setAttribute("data-keyboard", "false");

	return modal;
}

// function which creates a header div for the modal
function createModalHeader(innerHTML, modalID, hasCloseIcon){

	// gets appended to content
	var modalHeader = document.createElement("div");
	modalHeader.className = "modal-header";
	modalHeader.id = modalID + "Header";
	
	// create a modal title that gets
	// appended tot he modalHeader
	var headerContent = document.createElement("h5");
	headerContent.className = "modal-title text-center";
	headerContent.innerHTML = innerHTML;
	modalHeader.appendChild(headerContent);

	// create a close icon that gets appended to
	// the modal header
	if(hasCloseIcon){
		var closeIcon = createCloseIcon(modalID);
		modalHeader.appendChild(closeIcon);
	}

	// return the modal header
	return modalHeader;
}

// creates an "x" button in top-right-hand
// corner of the modal so that user can close it
// the onclick function is an example of events occurring
// whereby the modal is removed from the DOM
function createCloseIcon(modalID){

	var icon = document.createElement("button");
	icon.className = "close";
	icon.id = modalID + "CloseIcon";
	icon.setAttribute("type", "button");
	icon.setAttribute("data-dismiss", "modal")
	icon.setAttribute("aria-label", "Close");

	// event -- when button is clicked
	// the modal should be removed from the DOM
	icon.onclick = function(){removeModal(modalID)};

	var span = document.createElement("span");
	span.setAttribute("aria-hidden", "true");
	span.innerHTML = "&times";
	icon.appendChild(span);

	// return the icon
	return icon;
}


// many modals can get created dynamically
// as user interacts with website
// historic modals should be removed so that only one
// is contained in the DOM at any one time
// this method is called specifically via events
// controlled by buttons
function removeModal(id){
	var element = document.getElementById(id);
	if (typeof(element) != 'undefined' && element != null){
		element.parentNode.removeChild(element);
	}

}

// removes a modal backdrop that has already been spanned
function removeModalBackdrop(){
	var element = document.getElementsByClassName("modal-backdrop show")[0];
	if (typeof(element) != 'undefined' && element != null){
		element.parentNode.removeChild(element);
	}
}



