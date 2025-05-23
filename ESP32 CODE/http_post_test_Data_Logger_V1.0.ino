#include <AViShaWiFi.h>
#include <DHT.h>
#include <NewPing.h>

String uid = "your-uid";
AViShaWiFi wifi;
const char* ssid = "Wifi kost lantai 1";
const char* password = "enamenamtigaenam";
// const char* serverURL = "http://192.168.0.108/kelasrobot_webintegration1/api/send_esptodatabase.php";
const char* serverURL = "http://aryzzproject.my.id/DataLogger_ZV1.0/api/send_esptodatabase.php";

// ultras
#define TRIGGER_PIN 13
#define ECHO_PIN 14
NewPing sonar(TRIGGER_PIN, ECHO_PIN, 400);

// Setup DHT11
#define DHTPIN 25     // Pin data DHT11 tersambung ke GPIO 25 (bisa ganti sesuai wiring)
#define DHTTYPE DHT11 // Tipe sensor DHT11
DHT dht(DHTPIN, DHTTYPE);


void setup() {
  Serial.begin(115200);
  dht.begin();
  wifi.begin(ssid, password);
}

void loop() {
  // // Baca kelembapan dan suhu dari DHT11
  // float humidity = dht.readHumidity();
  // float temperature = dht.readTemperature();
  // // baca ultras
  // int jarak = sonar.ping_cm();

  // // Cek apakah pembacaan sensor berhasil
  // if (isnan(humidity) || isnan(temperature)) {
  //   Serial.println("Failed to read from DHT sensor!");
  // } else {
  //   Serial.print("Humidity: ");
  //   Serial.print(humidity);
  //   Serial.print(" %\t");
  //   Serial.print("Temperature: ");
  //   Serial.print(temperature);
  //   Serial.println(" *C");

  //   // Buat data POST dengan format x-www-form-urlencoded
  //   String postdata_kuy = "humidity=" + String(humidity) + "&temperature=" + String(temperature);

  //   std::vector<String> headers;
  //   headers.push_back("Content-Type: application/x-www-form-urlencoded");

  //   // Kirim data ke server menggunakan POST
  //   String response = wifi.httpPOST(serverURL, postdata_kuy, headers);
  //   Serial.println("[SERVER RESPONSE] " + response);
  // }

// baca temp
float temperature = dht.readTemperature();
// baca ultras
int jarak = sonar.ping_cm();
Serial.print("temperature: ");
Serial.print(temperature);
Serial.print(" %\t");
Serial.print("jarak: ");
Serial.print(jarak);
Serial.println(" ");

// Buat data POST dengan format x-www-form-urlencoded
String postdata_kuy = "ultra_espz=" + String(jarak) + "&temperature_esp=" + String(temperature);

std::vector<String> headers;
headers.push_back("Content-Type: application/x-www-form-urlencoded");

// Kirim data ke server menggunakan POST
String response = wifi.httpPOST(serverURL, postdata_kuy, headers);
Serial.println("[SERVER RESPONSE] " + response);

delay(2000); // delay 2 detik sebelum loop ulang
}
