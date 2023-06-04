document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
        // Redirige al usuario a la página principal o a otra página del sitio
        // dependiendo de tus necesidades

        
        } else {
            // Muestra un mensaje de error en el formulario de login
        }
    })
    .catch(error => {
        console.log(error);
      // Muestra un mensaje de error en el formulario de login
    });
});