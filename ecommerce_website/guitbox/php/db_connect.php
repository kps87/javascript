<?php

	// connect to a database
	function connect_to_db($dbhost,$dbuser,$dbpassword,$dbname){
		
		// try to connect to database
		// use the @ symbol to suppress error printing
		$connection = @mysqli_connect($dbhost,$dbuser,$dbpassword,$dbname);

		// If there is no connection return a simple plain text error message
		if (!$connection){
			return "connectionError";
		}
		// else return the connection for further operation
		else{
			return $connection;
		}
	}

	// close an open connection
	function close_connection($connection){
		@mysqli_close($connection);
	}

?>
