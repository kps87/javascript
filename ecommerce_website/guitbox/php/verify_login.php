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
	$email = $_GET["var1"];
	$password = $_GET['var2'];

	// connect to the database
	$connection = connect_to_db($dbhost,$dbuser,$dbpassword,$dbname);

	// if the db connection fails
	// then return a simple plain text statement
	if($connection == "connectionError"){
		$return['result'] = "connectionError";
	}
	// else search for a user with this email and password
	else{

		// check the accounts for a table with this email and password
		$table = "accounts";
		$table_as_hash = table_to_hash($connection, $table, "SELECT * FROM $table WHERE email = '$email' AND password = '$password'");
		close_connection($connection);

		// if there are no return results
		// then there is no account
		if(count($table_as_hash) == 0){
			$return['result'] = "noAccount";
		}
		// else return the first instance of the select statement
		else{
			$return['result'] = "success";
			$return['firstName'] = $table_as_hash[1]['firstName'];
			$return['lastName'] = $table_as_hash[1]['lastName'];
		}
	}

	// return the result
	echo json_encode($return);

	

?>
