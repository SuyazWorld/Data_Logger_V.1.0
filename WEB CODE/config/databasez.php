<?php 
$hostz = "localhost";
$userz = "root";
$passz = "";
$database_namez = "ruangserver";
$connectionz = mysqli_connect($hostz, $userz, $passz, $database_namez);
if(!$connectionz){
    echo "gagal konek database";
}
?>