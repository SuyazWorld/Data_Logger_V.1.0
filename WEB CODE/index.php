<?php include_once "layoutpage/header.php";?>
<link rel="stylesheet" href="source/CSS/styles.css">

<?php include "layoutpage/navbar.php"?>

<div class="container mt-4 col-md-8 mb-3">
    <h3 class="text-center mb-4" style="color: #264653;">
        <i class="fas fa-chart-line me-2"></i>Sensor Data
    </h3>
    <div class="row g-4 mb-">
        <!-- ultrasonic -->
        <div class="col-md-6">
            <div class="card sensor-card shadow-sm border-0 p-4">
                <div class="card-body py-4">
                    <div class="d-flex align-items-center justify-content-between">
                        <!-- tulisannya dan logonya -->
                        <div class="d-flex align-items-center flex-grow-1">
                            <div class="sensor-icon temperature me-4">
                                <i class="fa-solid fa-people-arrows"></i>
                            </div>
                            <div>
                                <p class="card-title">Ultrasonic</p>
                                <div class="sensor-value">
                                    <p><strong id="ultrasonic_id" class=""></strong><strong class="unit"> CM</strong></p>
                                </div>
                            </div>
                        </div>
                        <!-- chart donutnya -->
                        <div class="chart-container2 text-center">
                            <canvas id="pieUltras"></canvas>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        
        <!-- potentio1 -->
        <div class="col-md-6">
            <div class="card sensor-card shadow-sm border-0 p-4">
                <div class="card-body py-4">
                    <div class="d-flex align-items-center justify-content-between">

                        <div class="d-flex align-items-center flex-grow-1">
                            <div class="sensor-icon potenz me-4">
                                <i class="fa-solid fa-arrows-spin"></i>
                            </div>
                            <div>
                                <p class="card-title">Humidity</p>
                                <div class="sensor-value">
                                    <p><strong id="potentio1_id" class=""></strong><strong class="unit">  %</strong></p>
                                </div>
                            </div>
                        </div>

                        <div class="chart-container2 text-center">
                            <canvas id="piePoten"></canvas>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- card untuk line chart Ultras -->
        <div class="col-md-6">
            <div class="card sensor-card shadow-sm border-0">
                <div class="card-body py-4">
                    <canvas id="Ultras_Chart"></canvas>
                </div>
            </div>
        </div>

        <!-- card untuk line chart Potentio 1 -->
        <div class="col-md-6">
            <div class="card sensor-card shadow-sm border-0">
                <div class="card-body py-4">
                    <canvas id="Poten_Chart"></canvas>
                </div>
            </div>
        </div>
            <!-- timestamp -->
            <div class="card border-info mb-3 col-md-12">
                <div class="card-header">Time Last-Update:</div>
                    <div class="card-body">
                    <p class="timestamp"><strong id="timestamp"></strong></p>
                </div>
            </div>
        </div>
    </div>
</div>


<?php include_once "layoutpage/footer.php"; ?>
<!-- script donut nya yaitu chart_donut.js nya ditampilin setelah footer, karena library nya kan diinput di footer -->
<!-- <script src="source/JS/chart_donut.js"></script> -->
<script src="source/JS/script.js"></script>
