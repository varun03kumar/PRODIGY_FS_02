const API_URL = 'http://localhost:5000';
const registrationForm = document.getElementById('registration-form');
const messageDiv = document.getElementById('message');

// Register a new user
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.innerHTML = "Registration successful! You can now log in.";
            messageDiv.style.color = "green";
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page
            }, 2000);
        } else {
            messageDiv.innerHTML = `Error: ${data.message}`;
            messageDiv.style.color = "red";
        }
    } catch (error) {
        messageDiv.innerHTML = 'Error: ' + error.message;
        messageDiv.style.color = "red";
    }
});
