---------------------------------------------------------------------------------------------------------------
Kieran P. Somers, kieransomers87@gmail.com
---------------------------------------------------------------------------------------------------------------
Table of Contents
-Project Requirements 	- an overview of how each project requirement was fulfilled
-Folder structure		- an overview of the structure of the website files (largely located in the ./guitbox folder)
-Logging in/Signing-up	- some usernames and passwords in the database that can be used to login without creating an account
-Development notes		- some notes on the software used and browsers tested
-PHP note 				- a note on php/DB commands and issues that might arise if DB connections cannot be made

---------------------------------------------------------------------------------------------------------------
Project Requirements
---------------------------------------------------------------------------------------------------------------
-Allow the user to ‘purchase’* items from the site;

	*For this assignment, 'purchase' can mean that the user is presented with the possibility to choose a
	product or item, select a quantity, and if the purchased button is clicked, they will be presented with
	a total cost.*

	Items can be purchased by navigating to an appropriate product page, clicking on the "add to cart for ..."
	button. When this is done a modal containing the items in the cart is spawned. This modal allows the user to 
	edit the quantities of any product being purchased, or to go directly to the checkout to purchase items.

	The checkout also page allows the user to edit the quantities of items by allowing the user to access the same
	modal containing tables of information about their product selections, or to enter shipping and payment details 
	and to make the purchase. 

	When a purchase is made the user receives a confirmation note, summarising their product purchase and shipping 
	information.

-Allow the customer to enter their login details and have login details validated (via a login
screen) before receiving a summary of the order;

	The user can login/sign-up (create an account) by clicking on the "login" link in the navbar.

	When either a login or sign-up is attempted, a database connection is made via xmlHTTPRequests,
	and the login screen informs the user as to the success of their login/sign-up attempt. Note that a
	login will fail if the account email and password are not in the database, and a sign-up attempt will
	fail if the email address is already in the database and so the login screen and validation is connected
	to the central database (upon account creation one can inspect the database in phpMyAdmin to confirm this).

	The login screen will inform the user if the account exists when they try to create it, if the account
	does not exist if they attempt to sign in, or if there has been an error in connecting to the database
	and login/sign-up details could not be validated.

	Once an account has been created and the user has logged in, the user can see a 
	summary of their order when they add an item to their cart, or on the checkout page which is accessible 
	through the "checkout" link in the navbar. 

	Note that the summary of the order is provided, and payments can be "made", in these modals even if 
	the user has no account or has not signed in (i.e. in the event of a database connection error);

-Perform form validation through JavaScript or HTML to ensure that:
	-text fields are not empty;
	-a valid email address is entered.

	Required text fields have been declared as such when input elements are created in the various javascript
	files via the "required" attribute, and fields that are not entered correctly are highlighted with a red outer box. 

	Further to this, javascript code has been written to perform form validation "formVerification.js", and 
	if an input field is not entered, any required fields are explicitly highlighted, and events are used 
	to warn the user that they must enter these details before contunuing. 
	These features are visible on the login and checkout pages.

	With specific respect to email addresses - Firefox identifies invalid e-mail addresses automatically, although
	this is not the case for the version of Google Chrome which was tested, although it us unclear why this is the case.

-Include a slideshow or carousel which displays a different image each time the page is loaded;

	Carousels are included on the "home" page when the site is loaded, with each of the three carousels generated 
	being populated with random products from the database (and their associated images) every time 
	the "home" page is visited. 

	The "generateCarousels.js" file contains all the source code used to generate the carousels, select 
	random elements of arrays so that random images can be generated (see generateCarousels(), 
	getRandomArrayElement() methods etc). 

	Note that it is possible that the same image is randomly chosen and clicking on
	"home" link in the navbar several times, or inspecting different images in the carousel should illustrate 
	that this requirement has been satisfied.

-Access and change HTML on the web page through the DOM;

	The "./common" folder contains HTML for three elements which require very little manipulation, and
	virtually all other website elements are created by the javascript files in the "./js/" folder which
	directly access and changed the DOM - there are many examples of HTML being accessed 
	(e.g. document.getElementByID(), document.getElementByClassName()), 
	and changed using different operators (e.g. via .innerHTML, setAttribute(), .className, .id, .appendChild, 
	element.parentNode.removeChild(element);) in these files.

-Access and change styling through the DOM;

	Virtually all styling is carried out via the DOM and manipulation of elements via their ".className" accessor. 
	The majority of styling is carried out using bootstrap, although some styling can be found in the "<style>"
	field of the "*.html" in the website base directory ("./guitbox"), where certain styling for images is carried 
	out directly via CSS. Some examples of styles being accessed and changed are:
		
		On the product pages, when an item is added to the cart, the color and text in the "add item to cart" buttons 
		is dynamically updated so that it is obvious to the user that an item is present in their cart already. 
		See lines 192-206 of "generateProducts.js" for the source code.
		The simplest way to observe this behaviour is to add an item to the cart, and click the "close" button or icon.
		The page will be refreshed and the button colour should now be updated.

		On the login page, when a login/sign-up is unsucessful after queriying the database, modals with different
		styles are presented to the user. See the following methods in the "login.js" file:
			loginVerificationStateChange() (lines 394, 400, 408, 426)
			signUpVerificationStateChange() (lines 456, 466, 472, 479)

		The simplest way to observe these features is to:
			a) try to sign-up with an account that already exists
			b) try to sign-in with an account that does not exist
			c) try to submit a login or sign-up request without filling in all required fields (see note below
				on form validation)

		On the checkout page, a number of buttons have been include which collapse/expand various checkout elements,
		in effect editing the style of the page via the DOM - see the createCollapseButton() method in checkout.js,
		which is called in the createBasketHeader(), createShippingDetailsForm() abd createPaymentForm()
		methods. Further to this, if the user trys to submit their checkout request without having entered all required 
		shipping and payment fields, the style of the forms is edited via the DOM (valid fields are highlighted in
		green text, invalid fields are highlighted in red text on a yellow background), as described below.

		During form validation, the isMissingFields() method in "formVerification.js" (lines 13, 19) is called
		by various methods in other javascript files which process form input(s). This isMissingFields() method changes 
		the styling of different input fields (boxes are highlighted as yellow, text as green or red) via the DOM to alert 
		users that various input fields are required, or have been entered incorrectly/correctly. The best way to visualise
		this feature is by attempting to submit a form with partially incomplete fields.

Demonstrate the use of events;

	Events are used frequently to help the user navigate the page and purchase items.
	Below is an overview of different events that are assigned to elements
	in various methods in the javascripts files, in each case the file name, line number
	and code snippet on the line is provided:

		login.js line 172: button.onclick = action; 

			see the createVerificationButton() method on lines 159-175, the "action" is piped
			into the method depending on the action required.
			
			The createVerificationButton() is used to create button elements
			which can be associated with either login or signup forms, and so the corresponding
			action is declared in the method signature via an anonymous function, e.g.:

				the action variable above could be function(){processLogin()}, 
				the action variable above could be function(){processSignUp()})

		checkout.js line 66: updateQuantitiesButton.onclick = function(){refreshCartModal()};

			see the buildBasket() method on lines 40-72

			In this example the updateQuantitiesButton element is a button which will
			spawn a modal when clicked, so that they can update the quantities of items in their
			basket. The following example elaborates further.

		cartTable.js: line 115: quantityForm.onchange = function(){updateProductQuantity(productIndex)};

			This even is associated with the previous event. The "quantityForm" is an input element
			with controls to change the quantity of an item in the cart.

			When the user changes the value in the quantityForm by clicking the control element, an event 
			is initiated which updates the product quantity in the cart via a call to the 
			updateProductQuantity() method on line 150 of the cartActions.js file

		cartModal.js line 170: footerButton1.onclick = function(){location.reload()};

			See the createCartModalFooter() method on lines 156-187.

			This event is associated with a button in a cart modal, when the close button
			is clicked, it initiates a full page reload so that stylistic updates to elements on the main
			page can take place.

		checkout.js line 364: button.onclick = function(){processPaymentForms()};

			See the buildPaymentButton() method on lines 348-372.

			This button is a submission button for the shipping and payment details forms
			which a user must complete when attempting to pay for their items. In this
			case when the button is clicked, the processPaymentForms() method
			is called to process the input fields, and generate appropriate feedback for
			the user (e.g. payment success, input is missing etc.)

		genericModal.js line 60: icon.onclick = function(){removeModal(modalID)};

			See the createCloseIcon() method on lines 49-69. 

			This event is used so that any modal divs that created and added to the DOM are removed 
			from the DOM when the modal close icon is clicked - this prevents multiple modals from being
			attached to the body of the html file as modals are spawned and dismissed.

		generateProducts.js line 197: buttonElement.onclick = function(){addItemToCart(guitar)};
		generateProducts.js line 205: buttonElement.onclick = function(){launchCartModal()};
		generateProducts.js line 268: buttonElement.onclick = function(){addItemToCart(amplifier)};
		generateProducts.js line 276: buttonElement.onclick = function(){launchCartModal()};
		generateProducts.js line 339: buttonElement.onclick = function(){addItemToCart(strings)};
		generateProducts.js line 347: buttonElement.onclick = function(){launchCartModal()};

			These groups of events are used to perform different actions in the
			createGuitarCard(), createAmplifierCard() and createStringsCard() methods.

			In each case the "same" buttons are assigned different actions depending on whether the cart
			does not contain a specific item (addItemToCart()), or if at least one 
			instance of this item is already in the cart and the user just has to edit
			the quantity (launchCartModal());

-Use an object or an array;

	Arrays and objects used frequently throughout the project to allow storage of data and iteration over elements.
	Below are the filenames and line numbers where various arrays are instantiated:

		cartActions.js:			line 115:	cart['products'] = [item];
		cartModal.js:			line 101:	var headers = ["#", "product", "price/€", "quantity", "cost/€", ""];
		cartTable.js:			line 46:	var rowData = [
		checkout.js:			line 159:	var headers = ["#", "product", "price/€", "quantity", "cost/€", ""];
		checkout.js:			line 435:	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		checkout.js:			line 466:	var years = ['2020', '2021', '2022', '2023', '2024'];
		checkout.js:			line 484:	var requiredFields = ["firstName","surName","addressLine1", "addressLine2","city","zipCode","country","cardName","cardNumber","cvv","monthPicker","yearPicker"];
		checkout.js:			line 615:	var elementsToRemove = ["basketContainer", "shippingForm", "paymentForm", "submitPayment"];
		generateCarousels.js:	line 31:	var products = [];
		generateCarousels.js:	line 32:	var guitars = []; 
		generateCarousels.js:	line 33:	var amps = [];
		generateCarousels.js:	line 34:	var strings = [];
		generateCarousels.js:	line 329:	var controls = [prev, next];
		generateProducts.js:	line 35:	var products = [];
		generateProducts.js:	line 36:	var products_filtered = []
		generateProducts.js:	line 171:	var features = ['body', 'neck', 'fretboard', 'numberFrets'];
		generateProducts.js:	line 243:	var features = ['power', 'weight', 'speaker'];
		generateProducts.js:	line 315:	var features = ['stringMaterial', 'gauge'];

	and some corresponding loops that actually employ these arrays can be similarly found in the following files/lines:

		cartActions.js:			line 51:	for (i in itemsInCart){
		cartActions.js:			line 65:	for (i in cart['products']){
		cartActions.js:			line 75:	for (i in cart['products']){
		cartActions.js:			line 139:	for (i in cart['products']){
		cartTable.js:			line 32:	for (i in products){
		cartTable.js:			line 85:	for (i in cells){
		checkout.js:			line 436:	for (i in months){
		checkout.js:			line 467:	for (i in years){
		checkout.js:			line 509:	for (i in elementIds){
		generateProducts.js:	line 85:	for (i in products){
		generateProducts.js:	line 91:	for (i in products){
		generateProducts.js:	line 97:	for (i in products){
		generateProducts.js:	line 178:	for (i in features){
		generateProducts.js:	line 249:	for (i in features){
		generateProducts.js:	line 320:	for (i in features){
		login.js:				line 521:	for (i in elementIds){

	In terms of objects, two types of object are used in the project, namely the Product() and Cart() objects. 

	Product object constructors are found in:

		generateCarousels.js:	line 359:	function Product(id){
		generateProducts.js:	line 361:	function Product(id){

	with the constructor given as follows:

		// class constructor for products
		function Product(id){
			this.id = id;
		}

	the only essential variable for a product is their "id", which is a unique identifer retrieved
	from the sql database (the primary key of the `products` table). All other product information retrieved from the database
	is added as fields (keys) to Product instances, for example, to create a list of products from
	the database, the following loop is used in the generateCarousels.js file.

	    // sort the responseText data into arrays of products
	    var products = []
		for(index in data){
			var product = new Product(data[index]['productID']);
			for(field in data[index]){
				product[field] = data[index][field];
			}
			products.push(product);
		}

	Similary, the Cart object constructor is given on line 1 of cartModal.js

		function Cart(){
			this.value = 0.0;
			this.products = []; // an array of product objects, or JSON-ified objects
		}

	With specific instances created and used in the following files/on the following lines:

		cartActions.js:		line 94:		cart = new Cart();
		cartActions.js:		line 137:		var updatedCart = new Cart();

-Connect to a database that contains relevant site information (eg., product info);

	Database connections are carried out via javascript and xmlHTTPRequests to php scripts
	which operate upon the database via SQL queries, in order to change or access product and account
	information. These requests are initiated in the following files on the following lines:

		generateCarousels.js:	line 9:		var xmlhttp = new XMLHttpRequest();
		generateProducts.js:	line 9:		var xmlhttp = new XMLHttpRequest();
		login.js:				line 540:	var xmlhttp = new XMLHttpRequest();
		login.js:				line 566:	var xmlhttp = new XMLHttpRequest();

	These requests are subsequently configured to call any of three php files located 
	in the "./php/" directory:

		get_products.php 	receives input from javascript XMLHttpRequest requests 
							and performs SQL queries to request products from the `products` table

		add_account.php     receives input from javascript XMLHttpRequest requests 
							and performs SQL queries to add an account with user name, password and
							email address to the `accounts` table

		verify_login.php 	receives input from javascript XMLHttpRequest requests 
							and performs SQL queries to verify an account with a given password 
							are in the `accounts` table

	An example request which aims to verify a login is found in the verifyLogin() method on line 532 of "login.js", 
	and is repeated as follows:

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

	with the loginVerificationStateChange() method "callback" monitoring the request status and state to ensure
	that the database connection and information retrieval was succesful.

	Note that there are two further php files which are shared by the above files
	to connect to and query the database in some cases, these "db_connect.php" and "db_queries.php".
	The former has some basic functions to connect to and close a database connection, with the latter effectively 
	turning an SQL table into a php associative array, which can subsequently be JSON-ified and converted to a 
	javascript dictionary so that various website elements and pages can be constructed, and so that various 
	actions and events can be controlled directly via javascript.

-Use the Bootstrap framework (via CDN);

	Bootstrap is relied upon heavily for element creation and styling - the number of instances of bootstrap
	usage are too many to reiterate here. Note that all .html files (e.g. home.html, login.html) in the 
	website base directory (./guitbox) call the required bootstrap .css and .js files via the CDN, 
	as well as jquery and popper. 

	Standard bootstrap elements are used to generate navbars, containers, rows, 
	cards, modal, carousels, jumbotrons, responsive tables, buttons, forms, form-controls, dropdowns/toggles, spinners, 
	lists. Bootstrap is also used to style html headers/text/backgrounds/borders, and to align/center all of 
	the above via padding and margin controls.

-Be a responsive website, that should display on standard devices from large screen
monitors, to tablets and phones.

	The website has been developed on a standard laptop screen (at various zoom levels), and various mobile devices 
	(e.g. Samsung S9, iphone, ipad)  have been emulated using the Responsive Design Mode in the Firefox developer window, 
	and in Google Chrome (note the version numbers and operating systems used below). 

	Overall the website displays as intended on all devices, largely due to the use of standard bootstrap elements
	such as containers and rows, and control of elements via the "col-sm-* col-md-* col-lg-*" className commands, 
	and the control of alignment/padding/margins etc. through bootstrap containers/rows.

---------------------------------------------------------------------------------------------------------------
Folder structure
---------------------------------------------------------------------------------------------------------------
./guitbox/		contains all website files/scripts/images/fonts
				the primary web pages (e.g. home.html, login.html) are stored here.
				These pages are highly minimal, and the generation of most content is done dynamically
				via calls to the javascript and php functions in the files below

	./common	contains a handful of html templates for common element i.e. navbars and jumbotrons

	./fonts 	contains images used in carousel indicators

	./img		contains images of all products, and the background image for website

	./js		contains all javascript files used to:
					-navigate the site
					-build, access, add, edit and remove DOM elements (pages, carousels, carts, modals, etc.)
					-control product purchasing/cart actions (events)
					-retrieve information from database (via xmlHTTPRequests and php queries) after events
				these javascript files are really the core of the website

	./php		contains all php scripts used to connect to and retrieve information from the database

./sql_database	contains the database creation/export files

	original_create_insert.sql 	- this is the original script used to create the database relations/tables

	web_project.sql 			- this is the database exported from phpMyAdmin as per guidelines on Moodle.

---------------------------------------------------------------------------------------------------------------
Logging in/Signing-up
---------------------------------------------------------------------------------------------------------------
The following user accounts have been created and can be used to login:

----------------------------------
email					password
----------------------------------
j.frusciante@gmail.com 	john1
j.hendrix@gmail.com 	jimi1
r.gallagher@gmail.com 	rory1

Note that the email address is the primary key in the database and so no two accounts can have the same email
address -- the website is built with this in mind and should warn the user appropriately when attempting to
create a new account with a pre-existing email.

---------------------------------------------------------------------------------------------------------------
Development notes
---------------------------------------------------------------------------------------------------------------
The project was developed largely on a linux mint (ubuntu) device using Mozilla Firefox v 74.0 (64-bit).
The user also tested the website in Google Chrome Version 80.0.3987.163 (Official Build) (64-bit) and most
functionality appeard to be the same (there were subtle style differences in the quantity selection buttons in
modals which display the cart but they function as intended).

The server/stack details were as follows:
    
	Database server
	    Server: Localhost via UNIX socket
	    Server type: MariaDB
	    Server connection: SSL is not being used
	    Server version: 10.4.11-MariaDB - Source distribution
	    Protocol version: 10
	    User: root@localhost
	    Server charset: UTF-8 Unicode (utf8mb4)

    Web Server
	    Apache/2.4.41 (Unix) OpenSSL/1.1.1d PHP/7.4.1 mod_perl/2.0.8-dev Perl/v5.16.3
	    Database client version: libmysql - mysqlnd 7.4.1
	    PHP extension: mysqli curl mbstring
	    PHP version: 7.4.1

    phpMyAdmin
		Version information: 5.0.1, latest stable version: 4.9.5

The database was created using the "original_create_insert.sql" file in the ./sql_database folder,
and an export of this database is provided as "web_project.sql" file in the same directory

---------------------------------------------------------------------------------------------------------------
PHP Note
---------------------------------------------------------------------------------------------------------------
In order for this website to function at a basic level (i.e. to display images of products which can be purchased),
it is essential that the sql database which contains product information can be connected to/is queriable. 

The ./php/ folder contains the important files. The *only* requirement is that the database stored in 
phpMyAdmin is "web_project". 

If a different database name is used, the $dbname variable needs to be changed at the top of the following 
three scripts:

	-get_products.php:	this file is crucial, if this script cannot return the product tables in the sql database 
						then no product information or images will be displayed and no items can be purchased. 
						If this occurs it is quite likely that most pages will not render any useful content!
	
	-add_account.php:	in order to purchase items, it is not crucial that one can add an account to the database 
						via an SQL query -- the majority of the website functionality can be observed without 
						creating an account, but for accounts to be added to the SQL tables, this file must be able
						to connect to the database and insert data into the `accounts` table.
	
	-verify_login.php:	in order to purchase items, it is not crucial that one can signs into an account that is present in
						the SQL database -- the majority of the website functionality can be observed without 
						signing into an account, but again, to login with a pre-existing account, this file must be
						to connect to the database an retrieve data from the `accounts` table;

the above three scripts delegate certain responsibility to functions in the "db_connect.php" and "db_queries.php" files,
although no edits to these latter two files should be required if for some reason the database is not named `web_project`.
