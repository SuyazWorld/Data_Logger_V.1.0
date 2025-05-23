<?php
include_once "../config/databasez.php";

$query_liatdata = "SELECT * FROM datazzz1 ORDER BY waktuz DESC LIMIT 1"; //desc itu descending ==  yang paling baru, terus limit 1 artinya 1 buah saja yang ditampilkan, nah artinya ini data yang paling baru hanya ditampilkan 1
$result_liatdata = mysqli_query($connectionz, $query_liatdata); //sebelum melakukan query lain, kita lakukan dulu query ke databasenya
$data_fecth1 = mysqli_fetch_assoc($result_liatdata); //untuk melihat data ini pakai fetch assoc
//mirip  $data_fecth1 = $result_liatdata->fetch_assoc();

//karena kita mau data tampil dalam bentuk json, kita pakai header dulu, 
header('Content-Type: application/json'); //content-type itu bawaan dari sononya
echo json_encode([ //encode itu kita ubah data yang ada di dalam database jadi json
    //data-data dibawah ini hasil dari fetch assoc
    'ultrasonic_read' => $data_fecth1['utlraz'] ?? '--', //ultrasonic_read itu key, valuenya ultraz, key itu bebas namanya ya
    'potentiometer_read' => $data_fecth1['Poten1z'] ?? '--', //nanti potentiometer_read ini adalah variable json yang bakal di fetch di script.js
    'waktu_read' => $data_fecth1['waktuz'] ?? 'N/A'
]);

?>