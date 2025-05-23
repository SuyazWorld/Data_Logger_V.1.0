// script.js ini fungsinya yg bisa membuat tampilan front-end auto update nilai data terbaru, khususnya di fungsi updateSensorData()

// Chart Line
async function renderLineChart() {
    try {
        let response = await fetch('../../api/showdatatochart.php');
        let data = await response.json();

        let timestamps = data.map(item => moment(item.timestamp).format('HH:mm:ss')); // Format lebih detail
        let ultras_cl = data.map(item => parseFloat(item.ultrasonicx));
        let poten_cl = data.map(item => parseFloat(item.Potentiox1));

        let ctxULTRA_zz = document.getElementById('Ultras_Chart').getContext('2d');
        let ctxPOTEN_zz = document.getElementById('Poten_Chart').getContext('2d');

        let chartConfig = (ctx, label, data, color) => new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [{
                    label,
                    data,
                    borderColor: color,
                    backgroundColor: color + '40',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'category',
                        ticks: {
                            font: {
                                size: 12
                            },
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });

        chartConfig(ctxULTRA_zz, 'ultras_cl (°C)', ultras_cl, '#e76f51');
        chartConfig(ctxPOTEN_zz, 'poten_cl (%)', poten_cl, '#2a9d8f');

    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}
renderLineChart(); 

async function updateLineChart() {
    try {
        let response = await fetch('../../api/showdatatochart.php');
        let data = await response.json();

        let timestamps = data.map(item => moment(item.timestamp).format('HH:mm:ss'));
        let ultras_cl = data.map(item => parseFloat(item.ultrasonicx));
        let poten_cl = data.map(item => parseFloat(item.Potentiox1));

        const ChartUltra_cl = Chart.getChart('Ultras_Chart');
        const ChartPoten_cl = Chart.getChart('Poten_Chart');

        if (ChartUltra_cl) {
            ChartUltra_cl.data.labels = timestamps;
            ChartUltra_cl.data.datasets[0].data = ultras_cl;
            ChartUltra_cl.update();
        }

        if (ChartPoten_cl) {
            ChartPoten_cl.data.labels = timestamps;
            ChartPoten_cl.data.datasets[0].data = poten_cl;
            ChartPoten_cl.update();
        }

    } catch (error) {
        console.error('Gagal memperbarui grafik:', error);
    }
}

setInterval(updateLineChart, 500); // Update every 5 seconds


// Chart Pie 
function renderPieChart(ultra_donut, poten_donut) {
    let ctxPieUltras = document.getElementById('pieUltras').getContext('2d');
    let ctxPiePoten = document.getElementById('piePoten').getContext('2d');

    new Chart(ctxPieUltras, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [ultra_donut, 264 - ultra_donut],
                backgroundColor: ['#e76f51', '#ddd'],
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    new Chart(ctxPiePoten, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [poten_donut, 4095 - poten_donut],
                backgroundColor: ['#2a9d8f', '#ddd'],
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
renderPieChart(0, 0); 

function updatePieChart(ultra_donut, poten_donut) {
    const pieChart_ultra_donut = Chart.getChart('pieUltras');
    const pieChart_poten_donut = Chart.getChart('piePoten');

    if (pieChart_ultra_donut) {
        pieChart_ultra_donut.data.datasets[0].data = [ultra_donut, 264 - ultra_donut];
        pieChart_ultra_donut.update();
    }

    if (pieChart_poten_donut) {
        pieChart_poten_donut.data.datasets[0].data = [poten_donut, 4095 - poten_donut];
        pieChart_poten_donut.update();
    }
}
// update data real-time also update data chart pie
function updateSensorData() {
    // fetch(), yang sering banget dipakai buat ngambil data dari server/API di dunia frontend
    // fetch() adalah fungsi bawaan di JavaScript (bisa dipakai di browser maupun Node.js) untuk melakukan permintaan HTTP (seperti GET, POST, dll).
    fetch('../../api/read.php') //ini artinya melakukan pengecekan ke apinya atau minta data ke api nya
    .then(response => response.json())
    .then(data => {
        document.getElementById('ultrasonic_id').innerHTML = `${data.ultrasonic_read}`; //yg disamping data. ini adalah varibel json yg udah kita buat di read.php
        document.getElementById('potentio1_id').innerHTML = `${data.potentiometer_read}`;
        document.getElementById('timestamp').textContent = data.waktu_read;
        // update chart_donutnya juga disini
        // Update Pie Chart with new data
        // updatePieChart(data.ultrasonic_read, data.potentiometer_read);
        updatePieChart(data.ultrasonic_read, data.potentiometer_read); 
    })
    .catch(error => console.error('Error fetching data:', error));

    //berikut nama variable di fetch yg bisa diganti
    // fetch('api/read.php') // Tetap pakai API yang sama
    // .then(komodoBakar => komodoBakar.json()) // response diganti jadi "komodoBakar"
    // .then(hasilSensorGalaksi => { // data diganti jadi "hasilSensorGalaksi"
    
    // // ID HTML-nya bebas juga, asal sesuai di HTML
        // document.getElementById('tampilan_ultra_super').innerHTML = `${hasilSensorGalaksi.ultras} cm`;
        // document.getElementById('tampilan_kelembaban_mantul').innerHTML = `${hasilSensorGalaksi.kelembaban}%`;
        // document.getElementById('waktu_terakhir_sensor').textContent = hasilSensorGalaksi.waktu;
    // })
    // .catch(errorMeteor => console.error('Gagal ambil data dari server 🚨:', errorMeteor));

}
updateSensorData();
setInterval(updateSensorData, 1000);

// Fungsi bawaan JavaScript yang dipakai buat mengirim HTTP request (kayak GET, POST, PUT, DELETE) ke server atau API.
// Kalau kamu ingin ambil data dari server, kirim data ke database, atau komunikasi antara frontend dan backend, ya pakainya fetch().
//  Tapi fetch() itu asynchronous, artinya:
// Dia nggak langsung kasih hasilnya kayak fungsi biasa.
// Dia ngasih kamu janji alias Promise, yang hasilnya nanti datang, setelah server kasih jawaban.

// fungsi then response:
// Setiap kali kamu pakai fetch(), kamu selalu dapat response dari server.
// Tapi, isi response itu bukan langsung data-nya — melainkan objek dengan informasi seperti:
        // fetch("https://api.example.com/data")
        //   .then(response => {
        //     console.log(response); // Ini bukan langsung data
        //   });
// Outputnya bakal kek dibawah ini:
        // Response {
        //     body: ReadableStream,
        //     status: 200,
        //     ok: true,
        //     headers: Headers,
        //     ...
        //   }
  
// struktur dasar fetch
//    fetch("https://api.example.com/data")
//   .then(response => response.json()) // ubah dari JSON string ke objek JS
//   .then(data => {
//     console.log(data); // tampilkan di console
//   })
//   .catch(error => {
//     console.error("Gagal ambil data:", error);
//   });
