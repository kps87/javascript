// function which uses jquery to get product
// information from the database to populate
// carousels with "random" images and their associated
// information
function generateProductPage(type){

	// create a new XMLHttpRequest, specify the url of the php file and provide arguments
	// and define the action when the ready state has changed;
	var xmlhttp = new XMLHttpRequest();
	var url = "./php/get_products.php";
	xmlhttp.onreadystatechange = function() {

		// function to be called when XMLHttpRequest readystate changes
    	productPageQueryStateChange(this.status, this.readyState, JSON.parse(this.responseText), type);

	};

	// open and send the request
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

// function which waits for the correct ready state and status
// from the server before building product pages for a given type of product
// rather than filtering the products here, it could have been done with an sql
// query but for the present purposes this is fine as the quantity of data
// is small
function productPageQueryStateChange(status, readyState, data, type){

	// when the ready state is okay process the data
	if(readyState == 4 && status == 200){

		// variables to store data
	    var products = [];
	    var products_filtered = []
	    
	    // sort the responseText data into arrays of products
		for(index in data){
			var product = new Product(data[index]['productID']);
			for(field in data[index]){
				product[field] = data[index][field];
			}
			products.push(product);
		}

		// foreach product test if they are of the correct type
		// if so add them to the filtered array - could do with an sql query
		for(i in products){
			if(products[i]['productType'] == type){
				products_filtered.push(products[i]);
			}
		}

		// creates a page for a specific product
		createProductPage(type, products_filtered);
	}

}

// create a page containing products of a given type
// where products is the array of products
function createProductPage(type, products){

	// get the body element
	var body = document.getElementById("body");

	// create a container for the main guitar jumbotron
	var jumbotron = generateProductPageHeaderJumbotron(type);
	body.appendChild(jumbotron);

	// create a container for the products
	var container = document.createElement("div");
	container.id = "product-container";
	container.className = "container border border-dark rounded-lg p-3 mb-3 bg-light";
	body.appendChild(container);

	// create a row for the products
	var row = document.createElement("div");
	row.className = "row border border-dark rounded-lg m-3 p-3 bg-light";
	container.appendChild(row);

	// for each product generate rows of images
	if(type == "guitar"){
		for (i in products){
			var card = createGuitarCard(products[i]);
			row.appendChild(card);
		}
	}
	else if(type == "amplifier"){
		for (i in products){
			var card = createAmplifierCard(products[i]);
			row.appendChild(card);
		}
	}
	else if(type == "strings"){
		for (i in products){
			var card = createStringsCard(products[i]);
			row.appendChild(card);
		}
	}

}

// create the product page jumbotron - no generic template is used
// this is a clear example of building a page using the DOM
function generateProductPageHeaderJumbotron(type){

	// create a div for the jumbotron
	var jumbotron = document.createElement("div");
	body.appendChild(jumbotron);
	jumbotron.id = "jumbotron-welcome";
	jumbotron.className = "jumbotron text-center border border-dark rounded-lg m-10 p-3 bg-light";

	// create a header
	var header = document.createElement("h1");
	header.className = "display-4 text-center";
	var label;
	if(type == "guitar"){
		label = "Guitars";
	}
	else if(type == "amplifier"){
		label = "Amplifiers";
	}
	else if(type == "strings"){
		label = "Strings";
	}
	header.innerHTML = label;

	// create a short paragraph and a horizontal rule for style
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Check out all of our products!";
	var horizontal_rule = document.createElement("hr");
	horizontal_rule.className = "my-4 text-center";

	// append the elements in their correct order
	jumbotron.appendChild(header);
	jumbotron.appendChild(paragraph);
	jumbotron.appendChild(horizontal_rule);

	return jumbotron;

}

// creates a card to house a single product (a guitar)
// and its associated image/details
function createGuitarCard(guitar){

	// create a card div
	var cardDiv = document.createElement("div");
	cardDiv.className = "card col-sm-12 col-lg-6 text-center p-3 bg-light";

	// create the corresponding image for the item
	var image = document.createElement("IMG");
	image.className = "image-fluid mb-3 border border-dark rounded-lg";
	image.src = "./img/" + guitar['image'];
	image.alt = "can't find image";

	// create the card body
	var cardBody = document.createElement("div");
	cardBody.className = "card-body";

	// create the card title and text
	var cardTitle = document.createElement("h5");
	cardTitle.className = "card-title text-center";
	cardTitle.innerHTML = guitar['description'];

	// create a small list group to store the guitar specs
	var listGroup = document.createElement("ul");
	listGroup.className = "list-group";
	var features = ['body', 'neck', 'fretboard', 'numberFrets'];
	var dictionary = {
		'body': 'Body', 
		'neck': 'Neck', 
		'fretboard': 'Fretboard', 
		'numberFrets': 'Number of Frets'
	};
	for (i in features){
		var item = document.createElement("li");
		item.className = "list-group-item";
		var capitalized = guitar[features[i]].charAt(0).toUpperCase() + guitar[features[i]].slice(1);
		item.innerHTML = dictionary[features[i]] + ": " + capitalized;
		listGroup.appendChild(item);
	}

	// create button and add to the body
	var buttonElement = document.createElement("button");
	buttonElement.setAttribute("type", "button");
	buttonElement.setAttribute("data-toggle", "modal")
	buttonElement.setAttribute("data-target", "#cartModal");

	// if the item is not in the cart
	// add it to the cart
	if(itemInCart(guitar) < 0){
		buttonElement.className = "btn btn-dark text-light m-3";
		buttonElement.innerHTML = "Add item to cart for €" + guitar['price'];
		buttonElement.onclick = function(){addItemToCart(guitar)};

	}
	// else change the style so that
	// it is obvious that it is in the cart
	else{
		buttonElement.className = "btn btn-success text-light m-3";
		buttonElement.innerHTML = "Update quantity in cart for €" + guitar['price'] + " per unit";
		buttonElement.onclick = function(){launchCartModal()};
	}

	// // add children in order
	cardBody.appendChild(cardTitle);
	cardBody.append(image);
	cardBody.appendChild(listGroup);
	cardBody.appendChild(buttonElement);
	cardDiv.appendChild(cardBody);
	return cardDiv;
}

// creates a card to house a single product (an amplifier)
// and its associated image/details
function createAmplifierCard(amplifier){

	// create a card div
	var cardDiv = document.createElement("div");
	cardDiv.className = "card col-sm-12 col-lg-6 text-center p-3 bg-light";

	// create the corresponding image for the item
	var image = document.createElement("IMG");
	image.className = "image-fluid mb-3 border border-dark rounded-lg";
	image.src = "./img/" + amplifier['image'];
	image.alt = "can't find image";

	// create the card body
	var cardBody = document.createElement("div");
	cardBody.className = "card-body";

	// create the card title and text
	var cardTitle = document.createElement("h5");
	cardTitle.className = "card-title text-center";
	cardTitle.innerHTML = amplifier['description'];

	// create a small list group to store the guitar specs
	var listGroup = document.createElement("ul");
	listGroup.className = "list-group";
	var features = ['power', 'weight', 'speaker'];
	var dictionary = {
		'power': 'Power / w', 
		'weight': 'Weight / kg', 
		'speaker': 'Speaker', 
	};
	for (i in features){
		var item = document.createElement("li");
		item.className = "list-group-item";
		var capitalized = amplifier[features[i]].charAt(0).toUpperCase() + amplifier[features[i]].slice(1);
		item.innerHTML = dictionary[features[i]] + ": " + capitalized;
		listGroup.appendChild(item);
	}

	// create button and add to the body
	var buttonElement = document.createElement("a");
	buttonElement.setAttribute("type", "button");
	buttonElement.setAttribute("data-toggle", "modal")
	buttonElement.setAttribute("data-target", "#cartModal");

	// if the item is not in the cart
	// add it to the cart
	if(itemInCart(amplifier) < 0){
		buttonElement.className = "btn btn-dark text-light m-3";
		buttonElement.innerHTML = "Add item to cart for €" + amplifier['price'];
		buttonElement.onclick = function(){addItemToCart(amplifier)};

	}
	// else change the style so that
	// it is obvious that it is in the cart
	else{
		buttonElement.className = "btn btn-success text-light m-3";
		buttonElement.innerHTML = "Update quantity in cart for €" + amplifier['price'] + " per unit";
		buttonElement.onclick = function(){launchCartModal()};
	}


	// // add children in order
	cardBody.appendChild(cardTitle);
	cardBody.append(image);
	cardBody.appendChild(listGroup);
	cardBody.appendChild(buttonElement);
	cardDiv.appendChild(cardBody);
	return cardDiv;
}

// creates a card to house a single product (strings)
// and its associated image/details
function createStringsCard(strings){

	// create a card div
	var cardDiv = document.createElement("div");
	cardDiv.className = "card col-sm-6 col-lg-6 text-center p-3 bg-light";

	// create the corresponding image for the item
	var image = document.createElement("IMG");
	image.className = "image-fluid mb-3 border border-dark rounded-lg";
	image.src = "./img/" + strings['image'];
	image.alt = "can't find image";

	// create the card body
	var cardBody = document.createElement("div");
	cardBody.className = "card-body";

	// create the card title and text
	var cardTitle = document.createElement("h5");
	cardTitle.className = "card-title text-center";
	cardTitle.innerHTML = strings['description'];

	// create a small list group to store the guitar specs
	var listGroup = document.createElement("ul");
	listGroup.className = "list-group";
	var features = ['stringMaterial', 'gauge'];
	var dictionary = {
		'stringMaterial': 'Material', 
		'gauge': 'Gauge (E-A-D-G-b-e)', 
	};
	for (i in features){
		var item = document.createElement("li");
		item.className = "list-group-item";
		var capitalized = strings[features[i]].charAt(0).toUpperCase() + strings[features[i]].slice(1);
		item.innerHTML = dictionary[features[i]] + ": " + capitalized;
		listGroup.appendChild(item);
	}

	// create button and add to the body
	var buttonElement = document.createElement("a");
	buttonElement.setAttribute("type", "button");
	buttonElement.setAttribute("data-toggle", "modal")
	buttonElement.setAttribute("data-target", "#cartModal");

	// if the item is not in the cart
	// add it to the cart
	if(itemInCart(strings) < 0){
		buttonElement.className = "btn btn-dark text-light m-3";
		buttonElement.innerHTML = "Add item to cart for €" + strings['price'];
		buttonElement.onclick = function(){addItemToCart(strings)};

	}
	// else change the style so that
	// it is obvious that it is in the cart
	else{
		buttonElement.className = "btn btn-success text-light m-3";
		buttonElement.innerHTML = "Update quantity in cart for €" + strings['price'] + " per unit";
		buttonElement.onclick = function(){launchCartModal()};
	}

	// // add children in order
	cardBody.appendChild(cardTitle);
	cardBody.append(image);
	cardBody.appendChild(listGroup);
	cardBody.appendChild(buttonElement);
	cardDiv.appendChild(cardBody);
	return cardDiv;
}


// class constructor for products
function Product(id){
	this.id = id;
}

