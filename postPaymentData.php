<?php
  // Create database connection
  $host = 'localhost';
  $user = 'root';
  $password = 'kitaets';
  $database = '2788055_pawstatic';
//establish connection with db:
  $connect = mysqli_connect($host, $user, $password , $database) or die('Connection Error to MySQL-Database.');
//decode and pull data out of the form input fields:
  $ccdata = json_decode(file_get_contents("php://input")) or die('Cannot decode form data .');

    if(count($ccdata) > 0 )  {  
           
      $holdername = mysqli_real_escape_string($connect, $ccdata->holder_name);
      $num = mysqli_real_escape_string($connect, $ccdata->num);
      $expirymm = mysqli_real_escape_string($connect, $ccdata->expiry_mm);
      $expiryyy = mysqli_real_escape_string($connect, $ccdata->expiry_yy);       
      $cvc = mysqli_real_escape_string($connect, $ccdata->cvc);
      $savauthorised = mysqli_real_escape_string($connect, $ccdata->saveCardNum);        
      $query = "INSERT INTO paymentdetails (holdername, cardnum, expirymm, expiryyy, cvc, saveauthorised) VALUES ('$holdername', '$num', '$expirymm', '$expiryyy', '$cvc', '$saveauthorised')";  
      if(mysqli_query($connect, $query))  
      {  
           echo "Data Inserted...";  
      }  
      else  
      {  
           echo 'Error';  
      }  
 }  


?>