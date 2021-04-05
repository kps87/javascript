// loads a navbar - common to all pages
// different navbars are loaded depending on login status
function loadNavbar(){

	// append a div to the body of the page
	var body = document.getElementById("body");
	var navbar = document.createElement("div");
	navbar.id = "navbar";
	body.appendChild(navbar);

	// choose the correct navbar for case that user is logged in
	if(sessionStorage.getItem("userLoggedIn") == "true"){
		templateByIdFromFile(navbar, 'common/navbar-logged-in.html');
	}
	else{
		templateByIdFromFile(navbar, 'common/navbar.html');
	}
}

// home page loads a navbar, a jumbotron and some carousels populated with random images
// carousels are called via the generateCarousels() method in generateCarousels.js
// loadNavbar() and loadJumbotron() are in the present file - different versions of these are loaded depending
// on whether the user is logged in or not
function loadHomePage(){
	loadNavbar();
	loadJumbotron();
	generateCarousels();	
}

// the login page loads various elements which allow a user to sign in,
// or sign-up. Delegates to functions in login.js
function loadLoginPage(){

	// delegate to navbar loading method
	loadNavbar();

	// primary function calls are contained in login.js
	var body = document.getElementById("body");
	var loginContainer = generateLoginContainer();
	var signUpContainer = generateSignUpContainer();
	body.appendChild(loginContainer);
	body.appendChild(signUpContainer);

}

// this function is called when the logout page
// is called, a navbar is loaded, if the user
// name is still in storage a specific goodbye message
// is loaded, if not a generic jumbotron is, carousels
// are then loaded via calls to functions in generateCarousels.js
// and finally the sessionStorage is cleared
function logUserOut(){
	if(sessionStorage.getItem("firstName")){
		generateGoodbyeJumbotron();
		sessionStorage.clear();
	}
	else{
		loadJumbotron();
	}
	loadNavbar();
	generateCarousels();
}

// loads a standard jumbotron, or a welcome jumbotron
// depending on whether user has just logged in or is not logged in
// or has been logged in for some time
function loadJumbotron(){

	// load a welcome jumbotron the first time the user logs in
	if(sessionStorage.getItem("userLoggedIn") == "true" && sessionStorage.getItem("wasWelcomed") != "true"){
		generateWelcomeJumbotron();
	}
	// else load a generic jumbotron from file
	else{
		// get the page body
		var body = document.getElementById("body");
		var jumbo = document.createElement("div");

		// load generic jumbotron from file
		jumbo.id = "jumbo";
		body.appendChild(jumbo);
		templateByIdFromFile(jumbo, 'common/jumbotron-generic.html');
	}
}

// create the welcome jumbotron - no generic template is used
// this is a clear example of building a page using the DOM
function generateWelcomeJumbotron(){

	// get the page body
	var body = document.getElementById("body");

	// create a div for the jumbotron
	var jumbotron = document.createElement("div");
	body.appendChild(jumbotron);
	jumbotron.id = "jumbotron-welcome";
	jumbotron.className = "jumbotron text-center border border-dark rounded-lg m-3 p-3 bg-light";

	// create a header
	var header = document.createElement("h1");
	header.className = "display-4 text-center";
	header.innerHTML = "Welcome back to GuítBox, " + sessionStorage.getItem("firstName") + "!";

	// create a short paragraph and a horizontal rule for style
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Check out all of our latest products and deals!";
	var horizontal_rule = document.createElement("hr");
	horizontal_rule.className = "my-4 text-center";

	// append the elements in their correct order
	jumbotron.appendChild(header);
	jumbotron.appendChild(paragraph);
	jumbotron.appendChild(horizontal_rule);

	// set a storage item so that welcome screen is
	// not regurgitated again and again
	sessionStorage.setItem("wasWelcomed", true);
}

// create the goodbye jumbotron - no generic template is used
// this is a clear example of building a page using the DOM
function generateGoodbyeJumbotron(){

	// get the page body
	var body = document.getElementById("body");

	// create a div for the jumbotron
	var jumbotron = document.createElement("div");
	body.appendChild(jumbotron);
	jumbotron.id = "jumbotron-welcome";
	jumbotron.className = "jumbotron text-center border border-dark rounded-lg m-3 p-3 bg-light";

	// create a header
	var header = document.createElement("h1");
	header.className = "display-4 text-center";
	header.innerHTML = "Thank your for shopping with GuítBox, " + sessionStorage.getItem("firstName") + "!";

	// create a short paragraph and a horizontal rule for style
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Please come back soon to check out all of our latest products and deals!";
	var horizontal_rule = document.createElement("hr");
	horizontal_rule.className = "my-4 text-center";

	// append the elements in their correct order
	jumbotron.appendChild(header);
	jumbotron.appendChild(paragraph);
	jumbotron.appendChild(horizontal_rule);

	// set a storage item so that welcome screen is
	// not regurgitated again and again
}

// loads/creates the guitars page dynamically
// via a call to the generateProductPage() in the
// generateProducts.js file in the ./js/ directory
function loadGuitarsPage(){
	loadNavbar();
	generateProductPage("guitar");
}

// loads/creates the amplifiers page dynamically
// via a call to the generateProductPage() in the
// generateProducts.js file in the ./js/ directory
function loadAmplifiersPage(){
	loadNavbar();
	generateProductPage("amplifier");
}

// loads/creates the strings page dynamically
// via a call to the generateProductPage() in the
// generateProducts.js file in the ./js/ directory
function loadStringsPage(){
	loadNavbar();
	generateProductPage("strings");
}

// builds and loads a checkout page via calls to the
// checkout.js file, and corresponding functions in cart*.js
// files which generate and manage carts dynamically
function loadCheckoutPage(){
	loadNavbar();
	generateCheckoutPage();
}

// function which uses jquery to load standard and common bootstrap
// elements from files located in ./common/ i.e navbars, generic jumbotrons
function templateByIdFromFile(id, filename){
	$(document).ready(function(){
	   $(id).load(filename);
	});
}



