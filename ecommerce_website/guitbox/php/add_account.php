<?php

	// include file with functions 
	// for opening and closing connections
	include 'db_connect.php';
	include 'db_queries.php';

	// define some variables for database
	// connection and those which have been
	// piped in from javascript
	$dbhost = "localhost";
	$dbuser = "root";
	$dbpassword = "";
	$dbname = "web_project";
	$firstname = $_GET['var1'];
	$surname = $_GET['var2'];
	$email = $_GET["var3"];
	$password = $_GET['var4'];

	// connect to the database
	$connection = connect_to_db($dbhost,$dbuser,$dbpassword,$dbname);

	// if the db connection fails return one result
	if($connection == "connectionError"){
		$return['result'] = "connectionError";
	}
	else{

		// find out if the user has an account
		// if so a new one cannot be created
		$table = "accounts";
		$table_as_hash = table_to_hash($connection, $table, "SELECT * FROM $table WHERE email = '$email'");
		if(count($table_as_hash) > 0){
			$return['result'] = "userExists";
		}
		// else try to insert the new data into the database
		else{

			// the sql database insert query
			$update_query = "INSERT INTO $table VALUES ('$firstname', '$surname', '$email', '$password')";
			
			// if the insertion could be done then account was created succesfully
			if (@mysqli_query($connection, $update_query)) {
				$return['result'] = "success";
			} 
			// else there was an account creation error
			else {
				$return['result'] = "accountCreationError";
			}	
		}

		// close the connection
		close_connection($connection);

	}

	// return the result as a json encoded result
	echo json_encode($return);

?>
