// function which dynamically builds the checkout
// page via DOM commands
function generateCheckoutPage(){

	// get the body element
	var body = document.getElementById("body");

	// if the cart is defined/has products
	// then create a checkout containing a summary of products
	// shipping and billing information, and a payment confirmation
	// button append the basket
	if(cartDefined()){

		// create the basket
		var basketContainer = buildBasket();
		body.appendChild(basketContainer);	

		// append shipping and billing containers
		var shippingBilling = buildShippingAndPayment();
		body.appendChild(shippingBilling);

		// add the payment submit button
		var paymentButton = buildPaymentButton();
		shippingBilling.appendChild(paymentButton);

	}

	// else create an empty container
	// which tells the user their basket is empty
	else{
		var basketContainer = buildEmptyBasket();
		body.appendChild(basketContainer);		
	}

}

// function which builds the basket, does so by building a table
// similar to tables used to build cartModals. Relies on calls
// to the cartTable.js and associated files and functions
function buildBasket(){

	// create the main container
	var basketContainer = document.createElement("div");
	basketContainer.className = "container border border-dark rounded-lg p-3 bg-light";
	basketContainer.id = "basketContainer";

	// create a header and append it to the container
	var header = createBasketHeader("Your Shopping Basket");
	basketContainer.appendChild(header);

	// add a horizontal rule for style
	var rule = document.createElement("hr");
	basketContainer.appendChild(rule);

	// create the table and append it to the container
	var tableDiv = createCheckoutTable();
	basketContainer.appendChild(tableDiv);

	// create a button to update quantities of products
	var div = document.createElement("div");;
	div.className = "row mt-3 p-3 mb-3";
	var updateQuantitiesButton = document.createElement("button");
	updateQuantitiesButton.className = "btn btn-dark text-light col-sm-6 col-md-6 p-3";
	updateQuantitiesButton.setAttribute("type", "button");
	updateQuantitiesButton.innerHTML = "Change product quantities";
	updateQuantitiesButton.onclick = function(){refreshCartModal()};
	div.appendChild(updateQuantitiesButton);
	basketContainer.appendChild(div);

	// return the basket containers
	return basketContainer;
}

// almost identical to above - builds an empty
// basket and tells user there are no items in their basket
function buildEmptyBasket(){

	// create the main container
	var basketContainer = document.createElement("div");
	basketContainer.className = "container border border-dark rounded-lg p-3 bg-light";
	basketContainer.id = "basketContainer";

	// create a header and append it to the container
	var header = createBasketHeader("Your Shopping Basket");
	basketContainer.appendChild(header);

	// tell the user their basket is empty
	var rule = document.createElement("hr");
	basketContainer.appendChild(rule);

	// create a message re: basket being empty
	var emptyMessage = document.createElement("div");
	basketContainer.appendChild(emptyMessage);
	emptyMessage.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	var row = document.createElement("div");
	emptyMessage.appendChild(row);
	row.className = "row align-items-center";
	var message = document.createElement("h5");
	message.className = "col-sm-12 text-center text-dark";
	message.innerHTML = "Your basket is currently empty";
	row.appendChild(message);

	// return the basketContainer
	return basketContainer;

}

// creates a simple header when provided with the
// inner html to be displayed, used in multiple elements in checkout page
function createBasketHeader(innerHTML){

	// create a header with a horizontal rule
	var row = document.createElement("row");
	row.className = "row bg-light text-dark col-sm-12 border-dark mr-3";
	var header = document.createElement("h1");
	header.className = "col-sm-8 col-md-10";
	header.innerHTML = innerHTML;
	row.appendChild(header);

	// create a button to collapse the table
	var button = createCollapseButton("#checkoutTable", "Show/Hide Basket");
	row.appendChild(button);

	// return the row
	return row;
}

// creates a collapse button so that various elements
// in the checkout page can be expanded and collapsed dynamically
function createCollapseButton(target, innerHTML){

	// create the button
	var collapse = document.createElement("button");
	collapse.className = "btn btn-dark text-light col-sm-4 col-md-2 p-3";
	collapse.setAttribute("type", "button");
	collapse.setAttribute("aria-expanded", "true");
	collapse.setAttribute("data-toggle", "collapse")
	collapse.setAttribute("data-target", target)
	collapse.innerHTML = innerHTML;

	return collapse;
}

// creates a table summarising the products which have been purchased
// largely delegates to the cartTable.js methods
function createCheckoutTable(){

	// create a resonsive div for the table
	var tableDiv = document.createElement("div");
	tableDiv.className = "table-responsive";
	tableDiv.id = "checkoutTable";

	// create a table to store data
	var table = document.createElement("table");
	table.className = "table bg-white text-dark table-bordered m-3 p-3";
	tableDiv.appendChild(table);

	// create the table header
	var headers = ["#", "product", "price/€", "quantity", "cost/€", ""];
	var thead = createTableHeader(headers);
	table.appendChild(thead);

	// create the table body
	var cart = getCart();
	var tbody = createTableBody(cart['products'], false);
	table.appendChild(tbody);

	// add the total to the bottom of the table
	var totalCost = document.createElement("tr");
	tbody.appendChild(totalCost);
	
	var cell = document.createElement("td");
	cell.className = "align-middle text-center";
	cell.setAttribute("colspan", "4");
	cell.innerHTML = "Total/€";
	totalCost.appendChild(cell);
	
	var costCell = document.createElement("td");
	costCell.className = "align-middle text-center";
	costCell.setAttribute("colspan", "1");
	costCell.innerHTML = cart.value;
	totalCost.appendChild(costCell);

	return tableDiv;
}

// builds containers for shipping and payment information
function buildShippingAndPayment(){

	// get the body element
	var shippingAndBilling = document.createElement("div");
	shippingAndBilling.className = "container border border-dark rounded-lg mt-3 mb-3 p-3 bg-light";

	// create a header and append it to the container
	var header = createCheckoutHeader("Checkout", "h1");
	shippingAndBilling.appendChild(header);

	// add a small horizontal rule to demarcate sections
	var rule = document.createElement("hr");
	shippingAndBilling.appendChild(rule);

	// create the shipping form
	var shippingForm = createShippingDetailsForm();
	shippingAndBilling.appendChild(shippingForm);

	// create the payment form
	var paymentForm = createPaymentForm();
	shippingAndBilling.appendChild(paymentForm);

	return shippingAndBilling;
}

// simple routine which creates a header with given html
// and element type (h1, h2, h3)
function createCheckoutHeader(innerHTML, type){

	// create a header with a horizontal rule
	var row = document.createElement("row");
	row.className = "row bg-light text-dark col-sm-12 border-dark mr-3";
	var header = document.createElement(type);
	header.className = "col-sm-8 col-md-10";
	header.innerHTML = innerHTML;
	row.appendChild(header);
	return row;
}

// creates a form in which the user can enter shipping details
function createShippingDetailsForm(){

	// create the main container
	var shippingForm = document.createElement("div");
	shippingForm.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	shippingForm.id = "shippingForm";

	// create a header
	var header = createCheckoutHeader("Invoice and Shipping Details", "h3");
	shippingForm.appendChild(header);

	// create a button to collapse/expand the form
	var button = createCollapseButton("#shippingCollapse", "Show/Hide Shipping Details");
	header.appendChild(button);

	// add a small horizontal rule to demarcate sections
	var rule = document.createElement("hr");
	shippingForm.appendChild(rule);

	// create the form group and a row for it
	var form = document.createElement("form");
	form.className = "form mt-3 p-3";
	form.id = "shippingCollapse"
	shippingForm.appendChild(form);

	// create the first row for the company text field
	var formRow1 = createFormRow();
	form.appendChild(formRow1);
	var companyInput = createTextInputElement("Company", "companyName", "Company/Organisation/Band (optional)", false)
	companyInput.className = "form-group col-sm-12";
	formRow1.appendChild(companyInput);

	// create the second row for first and surname fields
	var formRow2 = createFormRow();
	form.appendChild(formRow2);
	var firstName = createTextInputElement("First name", "firstName", "Rory", true);
	var surName = createTextInputElement("Last name", "surName", "Gallagher", true);
	formRow2.appendChild(firstName);
	formRow2.appendChild(surName);

	// create the third row for address fields
	var formRow3 = createFormRow();
	form.appendChild(formRow3);
	var addressLine1 = createTextInputElement("Address Line 1", "addressLine1", "Apartment 66", true);
	var addressLine2 = createTextInputElement("Address Line 2", "addressLine2", "Main St. Ballyshannon", false);
	formRow3.appendChild(addressLine1);
	formRow3.appendChild(addressLine2);

	// create the fourth row for the city/county and zip code
	var formRow4 = createFormRow();
	form.appendChild(formRow4);
	var city = createTextInputElement("City/Region", "city", "Donegal", true);
	var zip = createTextInputElement("Zip", "zipCode", "Zip", false);
	var country = createTextInputElement("Country", "country", "Republic of Ireland", false);
	city.className = "form-group col-sm-4";
	zip.className = "form-group col-sm-2";
	country.className = "form-group col-sm-6";
	formRow4.appendChild(city);
	formRow4.appendChild(zip);
	formRow4.appendChild(country);

	// return the shipping form
	return shippingForm;
}

// creates a form in which the user can enter payment details
function createPaymentForm(){

	// create main container element
	var paymentForm = document.createElement("div");
	paymentForm.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	paymentForm.id = "paymentForm";

	// create a header
	var header = createCheckoutHeader("Payment Details", "h3");
	paymentForm.appendChild(header);

	// create a button to collapse/expand the form
	var button = createCollapseButton("#paymentCollapse", "Show/Hide Payment Details");
	header.appendChild(button);

	// add a small horizontal rule to demarcate sections
	var rule = document.createElement("hr");
	paymentForm.appendChild(rule);

	// create the form group and a row for it
	var form = document.createElement("form");
	form.className = "form mt-3 p-3";
	form.id = "paymentCollapse"
	paymentForm.appendChild(form);

	// create the first row for the company text field
	var formRow1 = createFormRow();
	form.appendChild(formRow1);
	var fullName = createTextInputElement("Cardholder Name", "cardName", "Rory Gallagher", true);
	fullName.className = "form-group col-sm-6";
	var cardNumber = createTextInputElement("Card number", "cardNumber", "1234 5678 9876 5432", true);
	cardNumber.className = "form-group col-sm-6";
	formRow1.appendChild(fullName);
	formRow1.appendChild(cardNumber);

	// create another row for the credit card number
	var formRow2 = createFormRow();
	form.appendChild(formRow2);
	var cvv = createTextInputElement("cvv", "cvv", "123", true);
	cvv.className = "form-group col-sm-4";
	var monthPicker = createMonthSelector();
	var yearPicker = createYearSelector();
	formRow2.appendChild(cvv);	
	formRow2.appendChild(monthPicker);	
	formRow2.appendChild(yearPicker);	

	return paymentForm;
}

// creates a container housing a button which parses all form
// input and confirms if payment was successful
// this is another example of events in action
// the payment button makes a call to the processPaymentForms method below
// to validate user input
function buildPaymentButton(){

	// create the main container
	var paymentButton = document.createElement("div");
	paymentButton.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	paymentButton.id = "confirmPayment";

	// create a header
	var header = createCheckoutHeader("Confirm Payment", "h3");
	paymentButton.appendChild(header);

	// create a button to collapse the table
	var button = document.createElement("button");
	button.className = "btn btn-dark text-light col-sm-4 col-md-2 p-3";
	button.setAttribute("type", "submit");
	button.id = "submitPayment";
	button.onclick = function(){processPaymentForms()};
	button.innerHTML = "Buy Now";
	header.appendChild(button);

	// add a small horizontal rule to demarcate sections
	var rule = document.createElement("hr");
	paymentButton.appendChild(rule);
	return paymentButton;
}

// creates a simple row in a form - used throughout for creating
// stylistically similar form elements
function createFormRow(){
	var row = document.createElement("div");
	row.className = "form-row";
	return row;	
}

// creates a text input box when provided with a label
// for the field, a unique id so that data can be retrieved,
// some placeholder text, and a boolean stating whether
// it is a required or an optional field
function createTextInputElement(textLabel, id, placeholder, requiredField){

	// create some forms groups
	var formGroup = document.createElement("div");
	formGroup.className = "form-group col-md-6";

	// create a label
	var label = document.createElement("label");
	label.setAttribute("for", id);
	label.innerHTML = textLabel;
	formGroup.appendChild(label);

	// create the input element/box
	var input = document.createElement("input");
	input.className = "form-control mb-3 p-3";
	input.setAttribute("type", "text");
	input.id = id;
	input.setAttribute("placeholder", placeholder)
	formGroup.appendChild(input);

	// if it is a required field
	// set an attribute which will warn the user
	if(requiredField){
		input.setAttribute("required", "true");
	}

	// return the form group
	return formGroup;
}

// creates a simple selector so that the month can be chosen
function createMonthSelector(){

	// create some forms groups
	var formGroup = document.createElement("div");
	formGroup.className = "form-group col-sm-4";

	// create a label
	var label = document.createElement("label");
	label.setAttribute("for", "monthPicker");
	label.innerHTML = "Expiry Month";
	formGroup.appendChild(label);

	// create the main form control element
	var select = document.createElement("select");
	select.className = "form-control";
	select.id = "monthPicker";
	
	// add the months in
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	for (i in months){
		var option =  document.createElement("option");
		option.innerHTML = months[i];
		select.appendChild(option);
	}

	// append and return the form group
	formGroup.appendChild(select);
	return formGroup
}

// creates a simple selector so that the year can be chosen
function createYearSelector(){

	// create some forms groups
	var formGroup = document.createElement("div");
	formGroup.className = "form-group col-sm-4";

	// create a label
	var label = document.createElement("label");
	label.setAttribute("for", "yearPicker");
	label.innerHTML = "Expiry Year";
	formGroup.appendChild(label);

	// create the main form control element
	var select = document.createElement("select");
	select.className = "form-control";
	select.id = "yearPicker";

	// add the years in
	var years = ['2020', '2021', '2022', '2023', '2024'];
	for (i in years){
		var option =  document.createElement("option");
		option.innerHTML = years[i];
		select.appendChild(option);
	}

	// append return the form group
	formGroup.appendChild(select);
	return formGroup;
}

// main function to handle processing of payment forms
// delegates to methods in formParsers.js below to confirm fields are entered
// but warning creation is done in the present file
function processPaymentForms(){

	// array defining fields which are required
	var requiredFields = ["firstName","surName","addressLine1", "addressLine2","city","zipCode","country","cardName","cardNumber","cvv","monthPicker","yearPicker"];

	// if one of the above fields is missing, then create a warning
	// and attach it to the DOM, the warning is only created and appended to DOM
	// once
	if(isMissingFields(requiredFields)){
		if(sessionStorage.getItem("paymentWarning") != "true"){
			createPaymentWarning();
		}
	}
	// if fields have been entered, remove any warnings
	// create a payment success message, and remove
	// the payment warning message from sessionStorage
	else{
		removePaymentWarning();
		createPaymentSuccess();
		sessionStorage.removeItem("paymentWarning");
	}
}

// function which removes elements from the DOM
// used specifically when the payment is complete, whereby
// the basket and shipping input forms are replaced
// with summary information on the payment
function removeCheckoutElements(elementIds){
	for (i in elementIds){
		var id = elementIds[i];
		var element = document.getElementById(id);
		element.parentNode.removeChild(element);
	}
}

// provides a warning if an input field was not
// entered correctly
function createPaymentWarning(){

	// append a row with a warning to the confirm payment element
	var confirmPayment = document.getElementById("confirmPayment");

	// create a container for the warning
	var warningContainer = document.createElement("div");
	warningContainer.id = "paymentWarning";
	warningContainer.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	confirmPayment.appendChild(warningContainer);

	// create a div to store the warning header in
	var warningDiv = document.createElement("div");
	warningDiv.className = "row align-items-center";
	warningContainer.appendChild(warningDiv);

	// create the warning header with text in an appropriate font
	var warningHeader = document.createElement("div");
	warningHeader.className = "col-sm-12 text-center text-danger";
	warningHeader.innerHTML = "Could not process payment, please enter all required fields";
	warningDiv.appendChild(warningHeader);
	sessionStorage.setItem("paymentWarning", "true")

}

// provides a confirmation that the payment was succesfully processed 
// it will dynamically create a summary of the basket, and the shipping information,
// generate a "unique" (random) invoice number, and removes unneeded elements
// from the checkout page
function createPaymentSuccess(){

	// set that the payment was confirmed in local storage
	// used to clear the cart when the next page is loaded
	sessionStorage.setItem("paymentConfirmed", "true");

	// get the original confirm payment element and use it
	// to add in summary details via containers
	var confirmPayment = document.getElementById("confirmPayment");
	var successContainer = document.createElement("div");
	successContainer.id = "paymentConfirmed";
	successContainer.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	confirmPayment.appendChild(successContainer);

	// create a row and put a header in it confirming the payment success
	var successDiv = document.createElement("div");
	successDiv.className = "row align-items-center";
	successContainer.appendChild(successDiv);
	var successHeader = document.createElement("div");
	successHeader.className = "col-sm-12 text-center text-success";
	var successHTML = "Your payment has been confirmed!<br>";
	successHTML = successHTML + "Your payment confirmation number is #inv" + getRandomInt(1E+06) + ".<br>";
	successHTML = successHTML + "Please keep a copy of this for your records.<br>";
	successHTML = successHTML + "Thank your for shopping with GuítBox!<br>Party on Garth!" ;
	successHeader.innerHTML =  successHTML ;
	successDiv.appendChild(successHeader);

	// create a basket/product summary container
	var basketSummaryDiv = document.createElement("div");
	basketSummaryDiv.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	confirmPayment.appendChild(basketSummaryDiv);

	var header = createCheckoutHeader("Product Summary", "h3");
	var table = createCheckoutTable();
	basketSummaryDiv.appendChild(header);
	basketSummaryDiv.appendChild(table);

	// create a new shipping and invoice summary
	var shippingSummaryDiv = document.createElement("div");
	shippingSummaryDiv.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	confirmPayment.appendChild(shippingSummaryDiv);

	// create the header for the summary
	var header = createCheckoutHeader("Shipping Summary", "h3");
	shippingSummaryDiv.appendChild(header);

	// get the required fields and the optional fields and merge them
	var shippingDiv = document.createElement("div");
	shippingDiv.className = "row align-items-center";
	shippingSummaryDiv.appendChild(shippingDiv);

	// add in the shipping info using the information
	// that was provided in the input forms
	var shippingTextDiv = document.createElement("div");
	shippingTextDiv.className = "col-sm-12 text-center";
	var shippingHTML = document.getElementById("firstName").value + " " + document.getElementById("surName").value + "<br>";
	if(document.getElementById("companyName").value != ""){
		shippingHTML += document.getElementById("companyName").value + "<br>";
	}
	shippingHTML += document.getElementById("addressLine1").value + "<br>";
	shippingHTML += document.getElementById("addressLine2").value + "<br>";
	shippingHTML += document.getElementById("city").value + "<br>";
	shippingHTML += document.getElementById("country").value + "<br>";
	shippingHTML += document.getElementById("zipCode").value + "<br>";
	shippingTextDiv.innerHTML = shippingHTML;
	shippingDiv.appendChild(shippingTextDiv);

	// remove items that are no longer required
	var elementsToRemove = ["basketContainer", "shippingForm", "paymentForm", "submitPayment"];
	removeCheckoutElements(elementsToRemove);

	// empty the cart
	sessionStorage.removeItem("cart");

}

// removes the payment warning container if a subsequent payment was
// successful
function removePaymentWarning(){
	var warningContainer = document.getElementById("paymentWarning");
	if (typeof(warningContainer) != 'undefined' && warningContainer != null){
		warningContainer.parentNode.removeChild(warningContainer);
	}
}

// generates a random integer for generating an invoice number
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

