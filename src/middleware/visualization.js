var ctx = document.getElementById("chartContainer").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Label 1", "Label 2", "Label 3"],
        datasets: [{
            label: "Data",
            data: [10, 20, 30],
            backgroundColor: ["red", "blue", "green"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});