<?php  
// Create database connection
  $host = 'localhost';
  $user = 'root';
  $password = 'kitaets';
  $database = '2788055_pawstatic';

  $connect = mysqli_connect($host, $user, $password , $database) or die('Connection Error to MySQL-Database.');
  $query = " SELECT * FROM clients ORDER BY id DESC LIMIT 4 " ;

  $result = mysqli_query($connect, $query) or die('Database query error.'); 

  // Fetch all
	$array = mysqli_fetch_all($result,MYSQLI_ASSOC);

	echo json_encode($array);

  mysqli_close($connect);

?>