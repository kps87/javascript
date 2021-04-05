// creates the header of a cart table
// and sets the style, when provided with
// an array of header names
function createTableHeader(headers){

	// create a table header element
	var thead = document.createElement("thead");
	thead.className = "thead-dark";
	thead.id = "cartTable";

	// delegate responsibility for creating the row
	// to the createTableRow method below where 0 below
	// corresponds the the row index (0 illicits a different reponse
	// from the row builder)
	var trow = createTableRow(0, headers)
	thead.appendChild(trow);

	// return the header
	return thead;
}

// function which when given a list of products
// will dynamically create a table of relevant information
function createTableBody(products, includeQuantityUpdater){

	// create the body element
	var tbody = document.createElement("tbody");
	tbody.id = "tableBody";

	// add the products to the table body
	var itemNumber = 0;
	for (i in products){

		// increment the itemNumber counter
		itemNumber+=1;

		// update the unit price and total price of each
		// product (based on quantity), and round to a suitable
		// number of significant figures
		var unitPrice = parseInt(products[i]['price']);
		unitPrice = unitPrice.toFixed(2);
		var totalPrice = parseFloat(products[i]['quantity']*products[i]['price']);
		totalPrice = totalPrice.toFixed(2)

		// construct an array of row data to be inserted into the table
		var rowData = [
			itemNumber, 
			products[i]['description'], 
			unitPrice, 
			products[i]['quantity'], 
			totalPrice, 
			"./img/" + products[i]['image']
		];

		// create a row of data and append the row to the body
		var trow = createTableRow(itemNumber, rowData, includeQuantityUpdater);
		tbody.appendChild(trow);
		
	}

	return tbody;
}

// creates a single table row based on provision
// of a rowNumber and an array containing information
// stored in each cell. The includeQuantityUpdater boolean field
// is used to control whether a simple button is included so that
// a field in the table can be incremented by the user
function createTableRow(rowNumber, cells, includeQuantityUpdater){

	// create a row
	var trow = document.createElement("tr");

	// if rowNumber is 0 its a table header, else
	// it's a row in the body of the table
	var type = "td";
	if(rowNumber == 0){
		type = "th";
	}

	// for each cell, add them as a td element
	// note that special logic is required
	// to store images, which are always the last
	// column
	for (i in cells){

		// create a cell in the table
		var cell = document.createElement(type);
		cell.className = "align-middle text-center";
		cell.setAttribute("scope", "col");

		// the last cell is an image, create an image
		// element and assign a classname which will allow
		// for sizes to be controlled in css
		if(rowNumber > 0 && i == cells.length-1){
			var image = document.createElement("IMG");
			image.className = "img-table";
			image.src = cells[i];
			image.alt = "can't find image";
			cell.appendChild(image);
		}
		// create a quantity clicker button
		else if(rowNumber > 0 && i == cells.length-3){

			// if the user has requested a quantity clicker
			// then build one and include it with a corresponding
			// anonymous function for events
			if(includeQuantityUpdater){
				var quantityForm = document.createElement("input");
				quantityForm.className = "form-control sm-2";
				var productIndex = rowNumber-1;
				quantityForm.id = "productEvent" + productIndex + "Quantity";
				quantityForm.setAttribute("type", "number");
				quantityForm.setAttribute("value", cells[i]);
				quantityForm.onchange = function(){updateProductQuantity(productIndex)};
				cell.appendChild(quantityForm);
			}

			// else just append the table data
			else{
				cell.innerHTML = cells[i];
			}
		}

		// else it is a simple text/numeric cell
		// just set the inner html to the appropriate value
		else{
			cell.innerHTML = cells[i];
		}

		// append the cell to the row
		trow.appendChild(cell);		
	}

	// return the row
	return trow;
}






