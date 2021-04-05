// function which uses jquery to get product
// information from the database via php to populate
// carousels with random images and their associated
// information (description, price)
function generateCarousels(){

	// create a new XMLHttpRequest, specify the url of the php file and provide arguments
	// and define the action when the ready state has changed;
	var xmlhttp = new XMLHttpRequest();
	var url = "./php/get_products.php";
	xmlhttp.onreadystatechange = function() {

		// function to be called when XMLHttpRequest readystate changes
    	carouselProductQueryStateChange(this.status, this.readyState, JSON.parse(this.responseText));

	};

	// open and send the request
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

// function which waits for the correct ready state and status
// from the server before building carousels
function carouselProductQueryStateChange(status, readyState, data){

	// when the ready state is okay process the data
	if(readyState == 4 && status == 200){

		// arrays used to store various data
		var products = [];
		var guitars = [];
		var amps = [];
		var strings = [];

		// convert the data hash array into product objects
		for(index in data){
			var product = new Product(data[index]['productID']);
			for(field in data[index]){
				product[field] = data[index][field];
			}
			products.push(product);
		}

		// group products by their type
		for(i in products){
			if(products[i]['productType'] == "guitar"){
				guitars.push(products[i]);
			}
			else if(products[i]['productType'] == "amplifier"){
				amps.push(products[i]);
			}
			else if(products[i]['productType'] == "strings"){
				strings.push(products[i]);
			}
		}

		// create a container for the carousels
		var carouselContainer = document.createElement("div");
		carouselContainer.id = "carousel-container";
		carouselContainer.className = "container border border-dark rounded-lg p-3 bg-light";
		var body = document.getElementById("body");
		body.appendChild(carouselContainer);

		// create carousels of different items
		createGuitarCarousel(guitars);
		createAmplifierCarousel(amps);
		createStringCarousel(strings);
	}
}

// function which populates the guitar Carousel
// with random images, and their associated information
function createGuitarCarousel(guitars){

	// select three random elements and sort them by price
	var randomGuitars = getRandomArrayElement(guitars, 3);
	var randomGuitars = sortObjectsByField(randomGuitars, "price");

	// get the carousel container
	var container = document.getElementById("carousel-container");

	// create a row div to put card and carousel into
	var rowDiv = document.createElement("row");
	rowDiv.className = "row border border-dark rounded-lg m-3 p-3 bg-white";

	// create a card with details of the random guitars
	var innerText = "Whether you're a novice or a guitar hero, we have the right kit for you like this " + randomGuitars[0]['description']
	+ " for only €" + randomGuitars[0]['price'] + ", a " + randomGuitars[1]['description'] + " for only €" + randomGuitars[1]['price'] +  " or this " + 
	randomGuitars[2]['description'] + " for only €" + randomGuitars[2]['price'];
	var cardDiv = createCard(randomGuitars, "Guitars", "Check out all our latest models!", innerText, "guitars.html");

	// create a carousel with imates of the same guitars
	var carouselDiv = createCarousel(randomGuitars, "guitarCarousel");

	// add the card and carousel to the row
	rowDiv.appendChild(cardDiv);
	rowDiv.appendChild(carouselDiv);

	// add the row to the carousel container
	container.appendChild(rowDiv);
}

// create amplifier carousel as above
function createAmplifierCarousel(amplifiers){

	// select three random elements and sort them by price
	var randomAmps = getRandomArrayElement(amplifiers, 3);
	var randomAmps = sortObjectsByField(randomAmps, "price");

	// get the carousel container
	var container = document.getElementById("carousel-container");

	// create a row div to put card and carousel into
	var rowDiv = document.createElement("row");
	rowDiv.className = "row border border-dark rounded-lg m-3 p-3 bg-white";

	// create a card with details of the random guitars
	var innerText = "Whether you are a bedroom boogier, or on your latest tour our amps will give you the sound you need, from the  " + randomAmps[0]['description']
	+ " for only €" + randomAmps[0]['price'] + ", a " + randomAmps[1]['description'] + " for only €" + randomAmps[1]['price'] +  " or this " + 
	randomAmps[2]['description'] + " for only €" + randomAmps[2]['price'];
	var cardDiv = createCard(randomAmps, "Amps", "Browse our latest amps, and turn it up to 11!", innerText, "amplifiers.html");

	// create a carousel with imates of the same guitars
	var carouselDiv = createCarousel(randomAmps, "ampCarousel");

	// add the card and carousel to the row
	rowDiv.appendChild(cardDiv);
	rowDiv.appendChild(carouselDiv);

	// add the row to the carousel container
	container.appendChild(rowDiv);

}

// create string carousel as above
function createStringCarousel(strings){

	// select three random elements and sort them by price
	var randomStrings = getRandomArrayElement(strings, 3);
	var randomStrings = sortObjectsByField(randomStrings, "price");

	// get the carousel container
	var container = document.getElementById("carousel-container");

	// create a row div to put card and carousel into
	var rowDiv = document.createElement("row");
	rowDiv.className = "row border border-dark rounded-lg m-3 p-3 bg-white";

	// create a card with details of the random guitars
	var innerText = "You won't beat our prices on high-quality strings with the best tone, try on the " + randomStrings[0]['description']
	+ "\'s for €" + randomStrings[0]['price'] + ", " + randomStrings[1]['description'] + "\'s for €" + randomStrings[1]['price'] +  " or these " + 
	randomStrings[2]['description'] + "\'s for €" + randomStrings[2]['price'];
	var cardDiv = createCard(randomStrings, "Strings", "String her up!", innerText, "strings.html");

	// create a carousel with imates of the same guitars
	var carouselDiv = createCarousel(randomStrings, "stringCarousel");

	// add the card and carousel to the row
	rowDiv.appendChild(cardDiv);
	rowDiv.appendChild(carouselDiv);

	// add the row to the carousel container
	container.appendChild(rowDiv);

}

// creates a price based card for products
function createCard(products, cardTitleText, cardButtonText, cardInnerText, href){
	
	// create a card div
	var cardDiv = document.createElement("div");
	cardDiv.className = "card col-lg-6 text-center mb-3 p-3 bg-light";

	// create the card body
	var cardBody = document.createElement("div");
	cardBody.className = "card-body";

	// create the card title and text
	var cardTitle = document.createElement("h5");
	cardTitle.className = "card-title";
	cardTitle.innerHTML = cardTitleText;

	// generate card text using the first random guitars description
	// for details
	var cardText = document.createElement("p");
	cardText.innerHTML = cardInnerText;

	// create button and add to the body
	var buttonElement = document.createElement("a");
	buttonElement.className = "btn btn-dark text-light";
	buttonElement.innerHTML = cardButtonText;
	buttonElement.href = href;

	// add children in order
	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardText);
	cardBody.appendChild(buttonElement);
	cardDiv.appendChild(cardBody);
	return cardDiv;

}

// creates a carousel given a list of products
function createCarousel(products, carouselID){

	// create the carousel div
	var carousel = document.createElement("div");
	carousel.className = "col-lg-6 carousel slide mb-3 p-3";
	carousel.id = carouselID;
	carousel.setAttribute("data-ride", "carousel");

	// create the carousel indicators
	var orderedList = createCarouselIndicators(products, carouselID);
	carousel.appendChild(orderedList);

	var carouselInner = createCarouselInner(products, carouselID);
	carousel.appendChild(carouselInner);

	// create the carouselControls
	var controls = createCarouselControls(carouselID);
	carousel.appendChild(controls[0]);
	carousel.appendChild(controls[1]);

	// return the complete carousel
	return carousel;

}

// creates indicators for the carousel
function createCarouselIndicators(products, carouselID){

	// create the ordered list of carousel-indicators
	var orderedList = document.createElement("ol");
	orderedList.className = "carousel-indicators";
	for(var i = 0; i < products.length; i++){
		var listElement = document.createElement("li");

		if(i == 0){
			listElement.className = "active bg-dark";
		}
		else{
			listElement.className = "bg-dark";
		}
		listElement.setAttribute("data-target", "#" + carouselID);
		listElement.setAttribute("data-slide-to", i.toString());
		orderedList.appendChild(listElement);
	} 
	return orderedList;
}

// creates the carousel-inner div
function createCarouselInner(products, carouselID){

	// create the carousel-inner contents
	var carouselInner = document.createElement("div");
	carouselInner.className = "carousel-inner align-items-center";

	// create the carousel-items
	for(i in products){

		// create a new carousel item
		var carouselItem = document.createElement("div");

		// if i is 0 make this item the active item
		if(i == 0){
			carouselItem.className = "carousel-item active";
		}
		else{
			carouselItem.className = "carousel-item";
		}

		// create the corresponding image for the item
		var carouselImage = document.createElement("IMG");
		carouselImage.className = "image-fluid mb-3";
		carouselImage.src = "./img/" + products[i]['image'];
		carouselImage.alt = "cant find image";
		carouselItem.appendChild(carouselImage);
		carouselInner.appendChild(carouselItem);
	}
	return carouselInner;

}

// creates carousel controls
// with hard-wired images if guitars :)
function createCarouselControls(hrefID){

	// create the scroll left icon
	var prev = document.createElement("a");
	prev.className = "carousel-control-prev";
	prev.setAttribute("href", "#" + hrefID);
	prev.setAttribute("role", "button");
	prev.setAttribute("data-slide", "prev");

	// create the span elements
	var spanElement1 = document.createElement("span");
	spanElement1.className = "carousel-control-prev-icon";
	spanElement1.setAttribute("aria-hidden", "true");

	var spanElement2 = document.createElement("span");
	spanElement2.className = "sr-only";
	spanElement2.innerHTML = "Previous";

	// append the span elements
	prev.appendChild(spanElement1);
	prev.appendChild(spanElement2);

	// create the scroll right icon
	var next = document.createElement("a");
	next.className = "carousel-control-next";
	next.setAttribute("href", "#" + hrefID);
	next.setAttribute("role", "button");
	next.setAttribute("data-slide", "next");

	var spanElement3 = document.createElement("span");
	spanElement3.className = "carousel-control-next-icon";
	spanElement3.setAttribute("aria-hidden", "true");

	var spanElement4 = document.createElement("span");
	spanElement4.className = "sr-only";
	spanElement4.innerHTML = "Next";
	
	// append the span elements
	next.appendChild(spanElement3);
	next.appendChild(spanElement4);

	// push and return
	var controls = [prev, next];
	return controls;
}

// gets n random array elements from an array
function getRandomArrayElement(array, n){

	// shuffle array and get sub-array of first n elements after shuffled
	const shuffled = array.sort(() => 0.5 - Math.random());
	let selected = shuffled.slice(0, n);
	return selected;
}

// sort a hash-type array of objects by some field
function sortObjectsByField(array, field){

	// use bubble sort, 'tis cheap for small arrays
	for(var i = array.length-1; i > 0; i--){
		for (var j = 0; j < i; j++) {
			if (array[j][field] > array[j + 1][field]) {
				var temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
	}
	return array;
}

// class constructor for products
function Product(id){
	this.id = id;
}

