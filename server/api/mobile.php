<?php
	$connection = pg_connect("host=localhost port=5432 dbname=weatheralert user=postgres pass=code7846");
	if($connection)
        echo '<h1>HURRICANES</h1>';
    else {
        echo pg_last_error($connection);
        echo "<h1>FAILURE</h1>";
    }
?>