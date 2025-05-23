<?php
include_once "../config/databasez.php";

$query_showtochart = "SELECT * FROM (SELECT * FROM datazzz1 ORDER BY waktuz DESC LIMIT 100) AS last_12 ORDER BY waktuz ASC"; //ini ada dua perintah query
$result_showtochart = mysqli_query($connectionz, $query_showtochart);

$data_simpanarray = array(); //nah ini dibuat dalam bentuk array karena datanya ada banyak,  nanti data query diatas disimpan disini
// kita bikin array kosong bernama $data.
// Kenapa? Karena nanti kita mau isi array ini dengan banyak data dari database, satu per satu.
// Bayangin aja kayak kita nyiapin keranjang kosong, terus nanti kita masukin data-data ke dalamnya.

// fungsi dibawah itu = fungsinya mengambil satu baris data dari hasil query tadi, dan hasilnya dalam bentuk associative array (kayak: ['waktu' => ..., 'suhu' => ..., 'kelembaban' => ...]).
// while (...) { ... } artinya: selama masih ada data yang bisa diambil, lakukan yang ada di dalam kurung kurawal {...}.
// Nah, di dalamnya kita masukin setiap baris data itu ke dalam $data[], yang tadi kita siapkan sebagai array kosong.
while ($row_showchart = mysqli_fetch_assoc($result_showtochart)) {
    // kita bikin array baru untuk setiap baris, lalu masukin ke $data.
    $data_simpanarray[] = array(
    'timestamp' => $row_showchart['waktuz'], // Sesuaikan dengan nama kolom di database
    'ultrasonicx' => $row_showchart['utlraz'],
    'Potentiox1' => $row_showchart['Poten1z']
    );
}
header('Content-Type: application/json');
echo json_encode($data_simpanarray);
?>