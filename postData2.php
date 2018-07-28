<?php
  // Create database connection
  $host = 'localhost';
  $user = 'root';
  $password = 'kitaets';
  $database = '2788055_pawstatic';



    if(!empty($_FILES['image'])){
        $ext = pathinfo($_FILES['image']['name'],PATHINFO_EXTENSION);
      $image = time().'.'.$ext;
      move_uploaded_file($_FILES["image"]["tmp_name"], 'images/'.$image);                    
      $image_path= 'images/'.$image;
      //var $image_path must return to keep the URL path
      

      $imageUrl = $image_path;
      
      echo $imageUrl;

      $connect = mysqli_connect($host, $user, $password , $database);

      $data = json_decode(file_get_contents("php://input"));
     
      if(count($data) > 0)  {  
           
      $petname = mysqli_real_escape_string($connect, $data->petname);
      $imageUrl = mysqli_real_escape_string($connect, $data->imageUrl);
      $breed = mysqli_real_escape_string($connect, $data->breed);
      $dob = mysqli_real_escape_string($connect, $data->dob);       
      $gender = mysqli_real_escape_string($connect, $data->gender);
      $status = mysqli_real_escape_string($connect, $data->status);       
      $weight = mysqli_real_escape_string($connect, $data->weight);  
      $query = "INSERT INTO clients (name, image, breed, dob, gender, status, weight) VALUES ('$petname', '$imageUrl', '$breed', '$dob', '$gender', '$status', '$weight')";  
      if(mysqli_query($connect, $query))  
      {  
           echo "Data Inserted...";  
      }  
      else  
      {  
           echo 'Error';  
      } 
  } 
 }  


?>