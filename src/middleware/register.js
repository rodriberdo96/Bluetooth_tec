document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      // Mostrar mensaje de éxito o redirigir al usuario a otra página
        const { token } = data;
        if (token) {
            localStorage.setItem('token', token);
            window.location.href = '/bluetooth.html';
        }
    })
    .catch(error => {
        console.log(error);
      // Mostrar mensaje de error en el formulario de registro
        const errorElement = document.getElementById("error");
        errorElement.textContent = error.message;
    })});