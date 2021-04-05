// function which generates the login container
// and associated input fields via form groups
function generateLoginContainer(){

	// create the base login container
	var loginContainer = document.createElement("div");
	loginContainer.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";
	loginContainer.id = "login-container";

	// create a div containing a row with a header as child
	// containing a simple text message for the user
	var accountInstructionsDiv = document.createElement("div");
	accountInstructionsDiv.className = "row align-items-center";
	loginContainer.appendChild(accountInstructionsDiv);

	var accountInstructionsDivHeader = document.createElement("h5");
	accountInstructionsDivHeader.className = "col-sm-12 text-center";
	accountInstructionsDivHeader.innerHTML = "Have an account? Then sign-in";
	accountInstructionsDiv.appendChild(accountInstructionsDivHeader);

	// create a form to which other elements are appended
	var loginForm = document.createElement("form");
	loginForm.className = "mt-3 p-3";
	loginContainer.appendChild(loginForm);

	// create a row to store the email and then
	// create the email input
	var loginFormGroup = document.createElement("div");
	loginFormGroup.className = "form-group row";
	var emailInput = createInputElement("Email", "loginEmail", "email", "username@domain.com", true);
	loginForm.appendChild(loginFormGroup);
	loginFormGroup.appendChild(emailInput[0]);
	loginFormGroup.appendChild(emailInput[1]);

	// create a row to store the password and then
	// create the password input
	var loginFormGroup = document.createElement("div");
	loginFormGroup.className = "form-group row";
	var passwordInput = createInputElement("Password", "loginPassword", "password", "1luvr0cknr0l1", true);
	loginForm.appendChild(loginFormGroup);
	loginFormGroup.appendChild(passwordInput[0]);
	loginFormGroup.appendChild(passwordInput[1]);

	// create a button to submit the form
	var loginFormGroup = document.createElement("div");
	loginFormGroup.className = "form-group row";
	var submitButton = createVerificationButton("button", "Sign-in", function(){processLogin()}, "loginVerificationModal");
	loginFormGroup.appendChild(submitButton);
	loginForm.appendChild(loginFormGroup);

	// return the container so it
	// can be used in the DOM
	return loginContainer;

}

// function which generates the login container
// and associated input fields
function generateSignUpContainer(){

	// create the base login container
	var signUpContainer = document.createElement("div");
	signUpContainer.className = "container border border-dark rounded-lg mt-3 mb-3 p-3 bg-light";
	signUpContainer.id = "signup-container";

	// create a div containing a row with a header as child
	// containing a simple text message for the user
	var signUpInstructionsDiv = document.createElement("div");
	signUpInstructionsDiv.className = "row align-items-center";
	signUpContainer.appendChild(signUpInstructionsDiv);

	var signUpInstructionsDivHeader = document.createElement("h5");
	signUpInstructionsDivHeader.className = "col-sm-12 text-center";
	signUpInstructionsDivHeader.innerHTML = "No account? Create one for free in seconds!";
	signUpInstructionsDiv.appendChild(signUpInstructionsDivHeader);

	// create a form to which other elements are appended
	var signUpForm = document.createElement("form");
	signUpForm.className = "mt-3 p-3";
	signUpContainer.appendChild(signUpForm);

	// create a row to store firstname
	var signUpFormGroup = document.createElement("div");
	signUpFormGroup.className = "form-group row";
	signUpForm.appendChild(signUpFormGroup);
	var firstNameInput = createInputElement("First Name", "firstName", "text", "Rory", true);
	signUpFormGroup.appendChild(firstNameInput[0]);
	signUpFormGroup.appendChild(firstNameInput[1]);

	// create a row to store lastname
	var signUpFormGroup = document.createElement("div");
	signUpFormGroup.className = "form-group row";
	signUpForm.appendChild(signUpFormGroup);
	var surNameInput = createInputElement("Last Name", "surName", "text", "Gallagher", true);
	signUpFormGroup.appendChild(surNameInput[0]);
	signUpFormGroup.appendChild(surNameInput[1]);

	// create a row to store the email and then
	// create the email input
	var signUpFormGroup = document.createElement("div");
	signUpFormGroup.className = "form-group row";
	signUpForm.appendChild(signUpFormGroup);
	var emailInput = createInputElement("Email", "signUpEmail", "email", "username@domain.com", true);
	signUpFormGroup.appendChild(emailInput[0]);
	signUpFormGroup.appendChild(emailInput[1]);

	// create a row to store the email and then
	// create the email input
	var signUpFormGroup = document.createElement("div");
	signUpFormGroup.className = "form-group row";
	signUpForm.appendChild(signUpFormGroup);
	var passwordInput = createInputElement("Password", "signUpPassword", "password", "1luvr0cknr0l1", true);
	signUpFormGroup.appendChild(passwordInput[0]);
	signUpFormGroup.appendChild(passwordInput[1]);

	// create a submit button
	var signUpFormGroup = document.createElement("div");
	signUpFormGroup.className = "form-group row";
	var submitButton = createVerificationButton("button", "Sign-up", function(){processSignUp()}, "signUpVerificationModal");
	signUpFormGroup.appendChild(submitButton);
	signUpForm.appendChild(signUpFormGroup);

	// return the container
	return signUpContainer;
}

// function which creates a generic input field when provided
// with the inner html, the id, the input type, some placeholder text
// and a boolean defining whether it is a required input field
function createInputElement(innerHTML, id, type, placeholder, required){

	// create the label
	var label = document.createElement("label");
	label.className = "col-sm-2 col-form-label";
	label.innerHTML = innerHTML;
	label.setAttribute("for", id);

	// create a div for the the input field
	var inputDiv = document.createElement("div");
	inputDiv.className = "col-sm-10";

	// create the input box
	var inputBox = document.createElement("input");
	inputBox.setAttribute("type", type);
	inputBox.className = "form-control";
	inputBox.id = id;
	inputBox.setAttribute("placeholder", placeholder)
	inputBox.setAttribute("required", required);
	inputDiv.appendChild(inputBox);

	// return the label element and input element
	return [label, inputDiv];
}

// function which creates a simplt button element
// to submit a form of a given type, with given inner html
// an anonymous function (action) which is called "onclick",
// and the modalID for the modal that will subsequently be launched
function createVerificationButton(type, innerHTML, action, modalID){

	// create a div for the the input field
	var buttonDiv = document.createElement("div");
	buttonDiv.className = "col-sm-12 align-items-center";

	// create the input box
	var button = document.createElement("button");
	button.setAttribute("type", type);
	button.className = "btn btn-dark text-light";
	button.innerHTML = innerHTML;
	button.setAttribute("data-toggle", "modal")
	button.setAttribute("data-target", "#" + modalID);
	button.onclick = action;
	buttonDiv.appendChild(button); 
	return buttonDiv;
}

// parses a sign in by confirming username and password
// are in an sql database to be queried by php
function processLogin(){

	// remove any pre-existing login/signup warnings that were spawned
	removeElements(['signUpWarning']);

	// first check that all fields were included
	if(isMissingFields(["loginEmail","loginPassword"])){

		// get any pre-existing warning elements
		var warning = document.getElementById("loginWarning");

		// if the warning already exists do nothing
		if (typeof(warning) != 'undefined' && warning != null){
		}
		// else create a warning
		else{
			var container = createMessageContainer("loginWarning", "Please enter all required fields", "warning");
			var loginContainer = document.getElementById("login-container");
			loginContainer.appendChild(container);
		}
	}
	// if all fields were included, then send a call to php/sql to validate
	// the login and load a verification modal in the mean time
	else{

		// spanws a modal while logging is being
		// verified via php call
		createLoginVerificationModal();

		// verify login via php call to sql database
		verifyLogin();
	}

}

// main function to handle processing of user sign-up
function processSignUp(){

	// remove any pre-existing warnings that were spawned
	removeElements(['loginWarning']);

	if(isMissingFields(["firstName","surName","signUpEmail", "signUpPassword"])){

		// get any pre-existing warning elements
		var warning = document.getElementById("signUpWarning");

		// if the warning already exists do nothing
		if (typeof(warning) != 'undefined' && warning != null){
		}
		// else create a warning
		else{
			var container = createMessageContainer("signUpWarning", "Please enter all required fields", "warning");
			var signUpContainer = document.getElementById("signup-container");
			signUpContainer.appendChild(container);	
		}
	}
	else{

		// create a modal while sign up is being
		// verified in the background
		createSignUpVerificationModal();

		// verify the signup via a call to php/sql
		verifySignUp();
	}
}

// creates a modal while user login is being verified
function createLoginVerificationModal(){

	// get the body element
	var body = document.getElementById("body");

	// if a modal already exists, remove it
	removeModal("loginVerificationModal");

	// add a modal that is blank and which will be modified
	var modal = createModalDiv("loginVerificationModal");
	body.appendChild(modal);

	// append modal-dialog to base div
	var modalDialog = document.createElement("div");
	modalDialog.className = "modal-dialog";
	modalDialog.setAttribute("role", "document");
	modal.appendChild(modalDialog);

	// append content to modalDialog
	var modalContent = document.createElement("div");
	modalContent.className = "modal-content";
	modalDialog.appendChild(modalContent);

	// create the modal header and append to the content
	var modalHeader = createModalHeader("Verifying Your Login", "loginVerificationModal", true);
	modalContent.appendChild(modalHeader);

	// the close icon that was created in createModalHeader is made invisible
	// and disabled while the login is being verified
	var closeIcon = document.getElementById("loginVerificationModalCloseIcon");
	closeIcon.setAttribute("disabled", "true");
	closeIcon.className = "close text-light";

	// create the body div
	var modalBody = document.createElement("div");
	modalBody.className = "modal-body text-center";
	modalBody.id = "modalBody";
	modalContent.appendChild(modalBody);

	// create a spinner div
	var spinner = document.createElement("div");
	spinner.className = "spinner-grow text-dark";
	spinner.setAttribute("role", "status");
	modalBody.appendChild(spinner);

	// create a message for the user
	var message = createMessageContainer("loginVerificationBody", "If you're not on the list, you're not getting in!<br>Please bear with us while our roadies check you in<br>", "dark");
	modalBody.appendChild(message);

	// include a span class
	var span = document.createElement("span");
	span.className = "sr-only";
	span.innerHTML = "Currently verifying your account details";
	spinner.appendChild(span);

	// create a container for the buttons
	var modalFooter = document.createElement("div");
	modalFooter.className = "modal-footer";
	modalContent.appendChild(modalFooter);
}

// similar function to above, creates a signup verification modal
// which is launched to screen while signup is being verified
function createSignUpVerificationModal(){

	// get the body element
	var body = document.getElementById("body");

	// if a modal already exists, remove it
	removeModal("signUpVerificationModal");

	// add a modal that is blank and which will later be modified
	// with product specific information
	var modal = createModalDiv("signUpVerificationModal");
	body.appendChild(modal);

	// append dialog to base div
	var modalDialog = document.createElement("div");
	modalDialog.className = "modal-dialog";
	modalDialog.setAttribute("role", "document");
	modal.appendChild(modalDialog);

	// append content to modal
	var modalContent = document.createElement("div");
	modalContent.className = "modal-content";
	modalDialog.appendChild(modalContent);

	// create the modal header and append to the content
	var modalHeader = createModalHeader("Creating Your Account", "signUpVerificationModal", true);
	modalContent.appendChild(modalHeader);

	// the close icon that was created in createModalHeader is made invisible
	// and disabled while signup is being verified
	var closeIcon = document.getElementById("signUpVerificationModalCloseIcon");
	closeIcon.setAttribute("disabled", "true");
	closeIcon.className = "close text-light";

	// create the body div
	var modalBody = document.createElement("div");
	modalBody.className = "modal-body text-center";
	modalContent.appendChild(modalBody);

	// create a spinner div
	var spinner = document.createElement("div");
	spinner.className = "spinner-grow text-dark";
	spinner.setAttribute("role", "status");
	modalBody.appendChild(spinner);

	// create a message for the user
	var message = createMessageContainer("signUpVerificationBody", "Please bear with us while our roadies check you in<br>", "dark");
	modalBody.appendChild(message);

	// include a span class
	var span = document.createElement("span");
	span.className = "sr-only";
	span.innerHTML = "Currently verifying your account details";
	spinner.appendChild(span);

	// create a container for the buttons
	var modalFooter = document.createElement("div");
	modalFooter.className = "modal-footer";
	modalContent.appendChild(modalFooter);
}

// function called by xmlHTTP request when it has received a response from
// the server -- it modifies the login page dynamically depending
// on the response received from the php/sql lookup
function loginVerificationStateChange(status, readyState, responseText){

	// get the inner html so it can be changed based on the status of the query
	var verificationModalInnerHTML = document.getElementById("loginVerificationBodyinnerHTML");

	// update the close icon so they can be used
	document.getElementById("loginVerificationModalCloseIcon").disabled = false;
	document.getElementById("loginVerificationModalCloseIcon").className += " text-dark";

	// do nothing for ready states of less than 4
	if(readyState < 4){

	}
	// if the ready state and status are okay
	// process the result from the sql query
	// to find out if user had an account
	else if(readyState == 4 && status == 200){

		// if there is a connection error
		if(responseText['result'] == 'connectionError'){
			verificationModalInnerHTML.className = "col-sm-12 text-center text-warning";
			verificationModalInnerHTML.innerHTML = "Sorry, we are having technical issues, please try again later. You are free to browse and purchase items without logging in.";
		}

		// if no account, then tell user to create one
		else if(responseText['result'] == 'noAccount'){
			verificationModalInnerHTML.className = "col-sm-12 text-center text-danger";
			verificationModalInnerHTML.innerHTML = "Sorry, we could not find an account with those details.<br>Ensure your login details are correct, or create an account!";
		}

		// if logged in then edit the modal
		else{

			// update the modal so user is informed
			verificationModalInnerHTML.className = "col-sm-12 text-center text-success";
			verificationModalInnerHTML.innerHTML = "Welcome " + responseText['firstName'] + "!<br>";
			verificationModalInnerHTML.innerHTML = verificationModalInnerHTML.innerHTML + " The Gods of Rock salute you!";
			
			// set some local variables so that different options can be implemented
			// in other parts of website
			sessionStorage.setItem("firstName", responseText['firstName']);
			sessionStorage.setItem("userLoggedIn", "true");

			// remove current login elements that are not required
			// and load the homepage
			removeElements(['login-container', 'signup-container']);
			loadHomePage();

		}
	}
	// else warn that something went wrong with the login but that they can keep shopping
	else{
		verificationModalInnerHTML.className = "col-sm-12 text-center text-warning";
		verificationModalInnerHTML.innerHTML = "Our systems is still working to sign you in,<br>but something may have gone wrong.";
		verificationModalInnerHTML.innerHTML += "You are free to browse and purchase without logging in.";
	}
}

// function called by xmlHTTP request when it has received a response from
// the server -- it modifies the login page dynamically depending
// on the response received from the php/sql lookup
function signUpVerificationStateChange(status, readyState, responseText){

	// get the inner html so it can be changed based on the status of the query
	var verificationModalInnerHTML = document.getElementById("signUpVerificationBodyinnerHTML");
	
	// update the close icon so they can be used
	document.getElementById("signUpVerificationModalCloseIcon").disabled = false;
	document.getElementById("signUpVerificationModalCloseIcon").className += " text-dark";

	// do nothing for ready states of less than 4
	if(readyState < 4){

	}
	// if the ready state and status are okay
	// process the result from the sql query
	// to find out if user had an account
	if(readyState == 4 && status == 200){

		// if account could be created
		if(responseText['result'] == 'success'){
			// update the modal so user is informed
			verificationModalInnerHTML.className = "col-sm-12 text-center text-success";
			verificationModalInnerHTML.innerHTML = "Your account has been created!<br>";
			verificationModalInnerHTML.innerHTML += "Please feel free to login, although you can browse and purchase items without doing so.";
			
			// remove current login elements that are not required
			removeElements(['signup-container']);
		}
		// if account could be created
		else if(responseText['result'] == 'userExists'){
			// update the modal so user is informed
			verificationModalInnerHTML.className = "col-sm-12 text-center text-warning";
			verificationModalInnerHTML.innerHTML = "A user with that e-mail address already exists!<br>";
			verificationModalInnerHTML.innerHTML += "Please feel free to login, although you can browse and purchase items without doing so.";
		}
		// if account could not be created
		else{
			verificationModalInnerHTML.className = "col-sm-12 text-center text-danger";
			verificationModalInnerHTML.innerHTML = "Sorry, we could not create an account, something may have gone wrong with out systems.<br>";
			verificationModalInnerHTML.innerHTML += "You are free to browse and purchase items without an account.";
		}
	}
	// else warn the user
	else{
		verificationModalInnerHTML.className = "col-sm-12 text-center text-warning";
		verificationModalInnerHTML.innerHTML = "Our systems is still working to sign you in,<br>but something may have gone wrong.";
		verificationModalInnerHTML.innerHTML += "You are free to browse and purchase.";
	}
}

// function which creates a generic container container a message of a given
// type (success, warning, danger etc) which can be used in verification/login modals
function createMessageContainer(id, message, messageType){

	// create a container for the confirmation message
	var container = document.createElement("div");
	container.id = id;
	container.className = "container border border-dark rounded-lg mt-3 p-3 bg-light";

	// create a row and put a header in it confirming the payment success
	var div = document.createElement("div");
	div.className = "row align-items-center";
	container.appendChild(div);
	var headerDiv = document.createElement("div");
	headerDiv.id = id + "innerHTML";
	headerDiv.innerHTML =  message;
	div.appendChild(headerDiv);

	// set the innerHTML text style based on the message type
	if(messageType == "success"){
		headerDiv.className = "col-sm-12 text-center text-success";
	}
	else if (messageType == "warning"){
		headerDiv.className = "col-sm-12 text-center text-danger";
	}
	else{
		headerDiv.className = "col-sm-12 text-center text-dark";
	}

	// return the container
	return container;
}

// function which removes multiple elements (stored
// as an array of element.ids) from the DOM.
function removeElements(elementIds){
	for (i in elementIds){
		var id = elementIds[i];
		var element = document.getElementById(id);
		if (typeof(element) != 'undefined' && element != null){
			element.parentNode.removeChild(element);
		}
	}
}

// function which retrieves account details
// from database and confirms the signin procedure
function verifyLogin(){

	// get the input fields
	var email = document.getElementById("loginEmail").value;
	var password = document.getElementById("loginPassword").value;

	// create a new XMLHttpRequest, specify the url of the php file and provide arguments
	// and define the action when the ready state has changed;
	var xmlhttp = new XMLHttpRequest();
	var url = "./php/verify_login.php?var1="+email+"&var2="+password;
	xmlhttp.onreadystatechange = function() {

		// function to be called when XMLHttpRequest readystate changes
    	loginVerificationStateChange(this.status, this.readyState, JSON.parse(this.responseText));

	};

	// open and send the request
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

// function which adds login database to the php database
function verifySignUp(){

	// get the fields from the input forms
	var firstName = document.getElementById("firstName").value;
	var surName = document.getElementById("surName").value;
	var email = document.getElementById("signUpEmail").value;
	var password = document.getElementById("signUpPassword").value;	

	// create a new XMLHttpRequest, specify the url of the php file and provide arguments
	// and define the action when the ready state has changed;
	var xmlhttp = new XMLHttpRequest();
	var url = "./php/add_account.php?var1="+firstName+"&var2="+surName+"&var3="+email+"&var4="+password;
	xmlhttp.onreadystatechange = function() {

		// function to be called when XMLHttpRequest readystate changes
    	signUpVerificationStateChange(this.status, this.readyState, JSON.parse(this.responseText));

	};

	// open and send the request
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


