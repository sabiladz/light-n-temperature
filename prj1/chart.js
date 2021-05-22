const ldrData = [];
const ldrConfig = {
    type: "line",
    data: {
        datasets: [
            {
                label: "LDR",
                data: ldrData,
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 0,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
            },
        ],
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Time"
                    },
                    type: "time",
                    distribution: "series",
                },
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Voltage (V)"
                    },
                    ticks: {
                        min: 0,
                        max: 3.5,
                    },
                },
            ],
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: "#6e707e",
            titleFontSize: 14,
            borderColor: "#dddfeb",
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: "index",
            caretPadding: 10,
        },
        animation: {
            duration: 0, // general animation time
        },
    },
};
const ldrChart = new Chart(document.getElementById("LDR"), ldrConfig);

const tempData = [];
const tempConfig = {
    type: "line",
    data: {
        datasets: [
            {
                label: "TEMP",
                data: tempData,
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgb(223, 78, 78)",
                pointRadius: 0,
                pointBackgroundColor: "rgb(223, 78, 78)",
                pointBorderColor: "rgb(223, 78, 78)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgb(223, 78, 78)",
                pointHoverBorderColor: "rgb(223, 78, 78)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
            },
        ],
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Time"
                    },
                    type: "time",
                    distribution: "series",
                },
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Temperature (°C)"
                    },
                    ticks: {
                        min: 0,
                        max: 50,
                    },
                },
            ],
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: "#6e707e",
            titleFontSize: 14,
            borderColor: "#dddfeb",
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: "index",
            caretPadding: 10,
        },
        animation: {
            duration: 0, // general animation time
        },
    },
};
const tempChart = new Chart(document.getElementById("TEMP"), tempConfig);

client.on("message", (topic, payload) => {
    const json = JSON.parse(payload.toString());

    if (topic === subData) {
        json.forEach(({ key, value }) => {
            changeValue(key, value);
        });
    }
});

const changeValue = (key, value) => {
    const date = new Date();

    if (key === "LDR") {
        if (ldrData.length > 30) {
            ldrData.shift();
        }

        ldrData.push({
            x: date.toISOString(),
            y: value
        });
        ldrChart.update();
    } else if (key === "TEMP") {
        if (tempData.length > 30) {
            tempData.shift();
        }

        tempData.push({
            x: date.toISOString(),
            y: value
        });
        tempChart.update();
    }
}