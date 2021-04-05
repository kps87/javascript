// function which launches a modal to screen, typically
// employed by various button elements on product pages
function launchCartModal(){

	var body = document.getElementById("body");
	var modal = createCartModal();
	body.appendChild(modal);

}

// refreshes a cart modal that user is current interacting with,
// this is done in such a way as to appear "live" to the user
function refreshCartModal(){

	// create a new modal and update its id
	// so that it is different from the one currently displayed
	// then append it to the body
	var newModal = createCartModal();
	newModal.id = "newModal";
	document.getElementById("body").appendChild(newModal);

	// the old modal backdrop should be removed
	// and the new modal loaded
	removeModalBackdrop();
	$("#newModal").modal('show');

	// remove the old modal from the body,
	// and
	removeModal("cartModal");
	newModal.id = "cartModal";
}

// creates a cart modal ab initio from the list of products
// that are currently stored in the cart.
function createCartModal(){

	// add a modal that is blank and which will later be modified
	// with product specific information
	var modal = createModalDiv("cartModal");

	// create and append dialog to base div
	var modalDialog = document.createElement("div");
	modalDialog.className = "modal-dialog";
	modalDialog.setAttribute("role", "document");
	modal.appendChild(modalDialog);

	// create and append content to modalDialog
	var modalContent = document.createElement("div");
	modalContent.className = "modal-content";
	modalDialog.appendChild(modalContent);

	// create the modal header and append to the modalContent
	var modalHeader = createModalHeader("Shopping Basket", "cartModal", false);
	modalContent.appendChild(modalHeader);

	// create the modal body - this is the key method
	// for dynamic generation of the modal
	var modalBody = createCartModalBody();
	modalContent.appendChild(modalBody);

	// create the modal footer -- a pair of buttons
	// which prompt user to close the modal
	// or go to the checkout.
	modalFooter = createCartModalFooter();
	modalContent.appendChild(modalFooter);

	// return the modal so that it can befurther manipulated
	// before displaying/appending to DOM
	return modal;

}

// creates the body of the modal, which is done by
// creation of a responsive table.
// The table is only created if their are products
// in the cart, else a message is displayed to inform
// user that they have an empty basket.
// some method calls are delegated to cartTable.js
// which is shared by this modal and the checkout.js files
function createCartModalBody(){

	// create the body of the modal
	var modalBody = document.createElement("div");
	modalBody.className = "modal-body text-center";

	// if the cart is defined then populate the table
	if(cartDefined()){

		// create a resonsive div for the table
		// which will be used to store the cart items
		var tableDiv = document.createElement("div");
		tableDiv.className = "table-responsive";
		modalBody.appendChild(tableDiv);

		// create a table to store data
		var table = document.createElement("table");
		table.className = "table text-dark table-bordered";
		tableDiv.appendChild(table);

		// create the table header
		var headers = ["#", "product", "price/€", "quantity", "cost/€", ""];
		var thead = createTableHeader(headers);
		table.appendChild(thead);

		// create the table body
		var cart = getCart();
		var tbody = createTableBody(cart['products'], true);
		table.appendChild(tbody);

		// add the total cost to the bottom of the table
		var totalCost = document.createElement("tr");
		tbody.appendChild(totalCost);
		
		var cell = document.createElement("td");
		cell.setAttribute("colspan", "4");
		cell.innerHTML = "Total/€";
		totalCost.appendChild(cell);
		
		var costCell = document.createElement("td");
		costCell.setAttribute("colspan", "1");
		costCell.innerHTML = cart.value;
		totalCost.appendChild(costCell);

	}
	// else alert the user that the checkout is empty
	else{

		// create a message re: basket being empty
		var emptyMessage = document.createElement("div");
		emptyMessage.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";

		// create a row to store message
		var row = document.createElement("div");
		emptyMessage.appendChild(row);
		row.className = "row align-items-center";

		// create the message
		var message = document.createElement("h5");
		message.className = "col-sm-12 text-center text-dark";
		message.innerHTML = "Your basket is currently empty";

		// append elements to DOM
		row.appendChild(message);
		modalBody.appendChild(emptyMessage);

	}

	// return the body of the modal
	return modalBody;
}

// creates the two buttons at the base of the modal
// this is an example of "events" in action
// when the close button is called it reloads the page
// so that formatting updates can take place.
function createCartModalFooter(){

	// create a container for the buttons
	var modalFooter = document.createElement("div");
	modalFooter.className = "modal-footer";

	// create a close button which closes the modal
	// and removes it from the DOM
	var footerButton1 = document.createElement("button");
	footerButton1.className = "btn btn-dark text-light";
	footerButton1.setAttribute("type", "button");
	footerButton1.setAttribute("data-dismiss", "modal")
	footerButton1.setAttribute("aria-label", "Close");
	footerButton1.innerHTML = "Close";
	footerButton1.onclick = function(){location.reload()};
	modalFooter.appendChild(footerButton1);

	// second button is a link to the "checkout.html"
	// page in the base directory -- this will call
	// various routines which build a checkout from scratch
	if(cartDefined()){
		var footerButton2 = document.createElement("a");
		footerButton2.className = "btn btn-dark text-light";
		footerButton2.setAttribute("type", "button");
		footerButton2.innerHTML = "Go to Checkout";
		footerButton2.href = "checkout.html"
		modalFooter.appendChild(footerButton2);
	}

	// return
	return modalFooter;
}



