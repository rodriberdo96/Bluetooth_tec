var device;
var characteristic;

document.getElementById("connectButton").addEventListener("click", function() {
    navigator.bluetooth.requestDevice({ filters: [] })
        .then(function(selectedDevice) {
            device = selectedDevice;
            return device.gatt.connect();
        })
        .then(function(server) {
            return server.getPrimaryService();
        })
        .then(function(service) {
            return service.getCharacteristic();
        })
        .then(function(char) {
            characteristic = char;
            document.getElementById("sendButton").disabled = false;
            console.log("Connected to Bluetooth device");
        })
        .catch(function(error) {
            console.log("Error: " + error);
        });
});

document.getElementById("sendButton").addEventListener("click", function() {
    var data = "Your data"; 
    
    // Aquí puedes establecer los datos que deseas enviar
    characteristic.writeValue(new TextEncoder().encode(data));
});