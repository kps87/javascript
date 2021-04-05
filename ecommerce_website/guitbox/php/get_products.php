<?php

	// include file with functions 
	// for opening and closing connections
	include 'db_connect.php';
	include 'db_queries.php';

	//Create a database connection
	$dbhost = "localhost";
	$dbuser = "root";
	$dbpassword = "";
	$dbname = "web_project";

	$connection = connect_to_db($dbhost,$dbuser,$dbpassword,$dbname);

	// if the db connection fails return one result
	if($connection == "connectionError"){
		$return['result'] = "connectionError";
	}
	else{
		$table = "products";
		$table_as_hash = table_to_hash($connection, $table, "SELECT * FROM $table");

		// close the connection
		close_connection($connection);
		$return = $table_as_hash;
	}

	// echo the hash as a json object
	// for javascript to retrieve
	// echo json_encode($table_as_hash);
	echo json_encode($return);

?>
