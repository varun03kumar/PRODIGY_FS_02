const API_URL = 'http://localhost:5000';
let token = localStorage.getItem('token');
const employeeForm = document.getElementById('employee-form');
const employeeTable = document.getElementById('employee-table').getElementsByTagName('tbody')[0];
const messageDiv = document.getElementById('message');

// Create Employee
employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const salary = document.getElementById('salary').value;

    const response = await fetch(`${API_URL}/employee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, position, department, salary }),
    });

    const data = await response.json();
    if (response.ok) {
        showMessage('Employee added successfully', 'success');
        fetchEmployees(); // Reload employee list
    } else {
        showMessage(data.message, 'error');
    }
});

// Fetch Employees
const fetchEmployees = async () => {
    const response = await fetch(`${API_URL}/employees`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const employees = await response.json();
    employeeTable.innerHTML = '';

    employees.forEach(employee => {
        const row = employeeTable.insertRow();
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td><button onclick="deleteEmployee('${employee._id}')">Delete</button></td>
        `;
    });
};

// Delete Employee
const deleteEmployee = async (id) => {
    const response = await fetch(`${API_URL}/employee/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        showMessage('Employee deleted!', 'success');
        fetchEmployees(); // Reload employee list
    } else {
        showMessage('Failed to delete employee', 'error');
    }
};

// Show messages
const showMessage = (message, type) => {
    messageDiv.innerHTML = `<div class="message-box ${type}">${message}</div>`;
};

// Initial fetch for employees
if (token) {
    fetchEmployees();
}
