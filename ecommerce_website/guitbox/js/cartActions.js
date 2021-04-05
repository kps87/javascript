// a simple constructor for a cart object - project specification requests
// use of an object, and or array, both of which are employed here
// all cart-related operations are stored centrally in sessionStorage via
// the creation, updating and removal of cart objects
function Cart(){
	this.value = 0.0;
	this.products = [];
}

// simple getter method to return the cart from session storage
function getCart(){
	return JSON.parse(sessionStorage.getItem("cart"));
}

// simple setter method to set the cart in session storage
// ensures that total cost is computed every time main cart is
// set in sessionStorage
function setCart(cart){

	// check if there are any items in the cart,
	// if not, remove the cart from sessionStorage
	if(numberOfItemsInCart(cart) < 1){
		sessionStorage.removeItem("cart");
	}
	// else calculate the cart total value before
	// setting the cart in sessionStorage
	else{
		calculateCartValue(cart);
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}
}

// a boolean test to see if a cart is already in sessionStorage.
// used throughout to confirm if a new cart needs to be initialized
// or if data can be extracted from a pre-existing one, or if certain
// actions should take place i.e. generating a table of cart items/quantities
// costs in modals/checkouts
function cartDefined(){
	if (getCart() != null) {
		return true;
	}
	return false;
}

// check if an item is in the cart - uses a simple linear search method
// returns the index of the item in the cart array, or -1 if not present
function itemInCart(item){
	if(cartDefined()){
		var cart = getCart();
		var itemsInCart = cart['products'];
		for (i in itemsInCart){
			if (itemsInCart[i]['id'] == item['id']){
				return i;
			}
		}		
	}
	return -1;
}

// calculates the total number of items in a cart object
// that is provided to it (number of items is not obtained from sessionStorage)
// a useful function when managing various cart actions
function numberOfItemsInCart(cart){
	var n = 0;
	for (i in cart['products']){
		n+=cart['products'][i]['quantity'];
	}
	return n;
}

// calculated the cart value as the sum of the product prices
// and their quantities
function calculateCartValue(cart){
	var sum = 0.0;
	for (i in cart['products']){
		sum+=cart['products'][i]['price']*cart['products'][i]['quantity'];
	}

	// round to 2 decimal places
	cart.value = sum.toFixed(2);
}

// add an item to the cart
// if no items exist, a new cart is created
// if an item already exists, a quantity counter
// is incremented
function addItemToCart(item){

	// get the cart, either by creating a new one
	// or by getting the JSON-ified one that
	// is present insession storage
	var cart;
	if(!cartDefined()){
		cart = new Cart();
	}
	else{
		cart = getCart();
	}

	// update the quantity of this item
	// if it already exist in the cart
	var productIndex = itemInCart(item);
	if(productIndex > -1){
		var currentQuantity = parseInt(cart['products'][productIndex]['quantity']);
		currentQuantity+=1;
		cart['products'][productIndex]['quantity'] = currentQuantity;
	}

	// else add the item by appending
	// it to the product list or by making it
	// the first entry in the list
	else{
		item['quantity'] = 1;
		if(cart.products == null){
			cart['products'] = [item];
		}
		else{
			cart.products.push(item);
		}
	}

	// update the cart in session storage
	// setCart has responsibility for calculating total costs
	setCart(cart);

	// launch a modal confirming the current cart
	// so that user can see what is in their cart
	// this call is to a function in cartModal.js
	launchCartModal();
}

// removes an item from the cart before setting the cart
function removeItemFromCart(productIndex){

	// create a new cart object
	// to transer items to
	var updatedCart = new Cart();
	cart = getCart();
	for (i in cart['products']){
		if(i != productIndex){
			updatedCart['products'].push(cart['products'][i]);
		}
	}
	setCart(updatedCart);
}

// changes a product quantity when provided with the index
// and the element in the cart table which currently contains
// the quantity (which is modified by the user)
function updateProductQuantity(productIndex){

	// get the current cart and quantity of item in the cartTable
	var cart = getCart();
	var quantity = document.getElementById("productEvent" + productIndex + "Quantity").value;
	
	// if the user has set the quantity greater than 0
	// the the quantity should be updated
	if(quantity > 0){
		cart['products'][productIndex]['quantity'] = quantity;
		setCart(cart);
	}
	// else the product should be removed from the cart
	else{
		removeItemFromCart(productIndex);
	}

	// the refresh modal function
	// updates the modal dynamically via jquery
	// so that user has instant feedback as the modify
	// their cartTable
	refreshCartModal();
}



