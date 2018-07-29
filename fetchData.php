<?php  
// Create database connection
  $host = 'localhost';
  $user = 'root';
  $password = 'kitaets';
  $database = '2788055_pawstatic';

  $connect = mysqli_connect($host, $user, $password , $database) or die('Connection Error to MySQL-Database.');
  //select last 4 rows from the dog's table:
  $query = " SELECT * FROM clients ORDER BY id DESC LIMIT 4 " ;

  $result = mysqli_query($connect, $query) or die('Database query error.'); 

  // Fetch all
$array = array();
  while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
      $array[] = $row;
  }
	// return json array to client
	echo json_encode($array);

  mysqli_close($connect);

?>