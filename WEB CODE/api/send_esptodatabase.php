<!-- ini api untuk menerima data dari esp lalu diteruskan lagi dengan query sql -->
<!-- esp kirim kesini lewat method post, lalu api ini yg insert ke database -->
<?php
include_once "../config/databasez.php";
//pengiriman data kita pakai method HTTP yaitu method POST, kita post data dari esp ke database
$ultra_z1 = $_POST['ultra_espz']; //parameter dalam array post ini adalah sama seperti di esp, jangan sampai beda namanya
$poten_z1 = $_POST['temperature_esp'];
$query_insertdata = "INSERT INTO datazzz1 (utlraz, Poten1z) VALUES ('$ultra_z1', '$poten_z1')";
$result_inserdata = mysqli_query($connectionz, $query_insertdata);

if ($result_inserdata) {
echo "Berhasil Tersimpan ke Database";
} else {
echo "Gagal Tersimpan ke Database";
}
?>