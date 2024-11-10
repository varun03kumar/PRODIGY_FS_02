const API_URL = 'http://localhost:5000';
const loginForm = document.getElementById('login-form');
const messageDiv = document.getElementById('message');

// Login Functionality
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'employee.html'; // Redirect to employee management page
        } else {
            messageDiv.innerHTML = data.message;
            messageDiv.style.color = "red";
        }
    } catch (error) {
        messageDiv.innerHTML = 'Error: ' + error.message;
        messageDiv.style.color = "red";
    }
});
