<?php

	// turns an sql table into a hash array
	function table_to_hash($connection, $table, $query){

		// get the field names
		$fields = get_field_names_from_table($connection, $table);

		// get the row data
		$result = mysqli_query($connection, $query);
		$row_count = 0;
		$hash = array();
		while($row = mysqli_fetch_array($result)){
			$row_count++;
			for($i = 0; $i < count($fields); $i++){
				if(isset($row[$fields[$i]])){
					$hash[$row_count][$fields[$i]] = $row[$fields[$i]];
				}
				else{
					$hash[$row_count][$fields[$i]] = "NULL";
				}
			}
		}	
		@mysqli_free_result($result);
		return $hash;
	}

	// function which gets column names from a table
	function get_field_names_from_table($connection, $table){
		$columns = array();
		$result = @mysqli_query($connection, "SHOW COLUMNS FROM $table");
		while($row = mysqli_fetch_array($result)){
		    array_push($columns, $row['Field']);
		}
		@mysqli_free_result($result);
		return $columns;
	}

?>
