<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
</head>
<body>
    <h1>Registration Form</h1>
    <form id="registration-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" required><br><br>
        
        <label for="accepted-terms">Accept Terms:</label>
        <input type="checkbox" id="accepted-terms" name="accepted-terms" required><br><br>
        
        <button type="submit">Submit</button>
    </form>

    <h2>Registered Users</h2>
    <table id="user-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Dob</th>
                <th>Accepted terms?</th>
            </tr>
        </thead>
        <tbody>
            <!-- Entries will go here -->
        </tbody>
    </table>

    <script>
        // Set restrictions on date input field
        function setDateRestrictions() {
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
            const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

            document.getElementById('dob').setAttribute('min', minDate.toISOString().split('T')[0]);
            document.getElementById('dob').setAttribute('max', maxDate.toISOString().split('T')[0]);
        }

        setDateRestrictions();

        // Handle form submission and add data to the table
        document.getElementById('registration-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting normally

            // Get the form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const dob = document.getElementById('dob').value;
            const acceptedTerms = document.getElementById('accepted-terms').checked ? 'Yes' : 'No';

            // Add a new row to the table with form data
            const table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            newRow.insertCell(0).textContent = name;
            newRow.insertCell(1).textContent = email;
            newRow.insertCell(2).textContent = password;
            newRow.insertCell(3).textContent = dob;
            newRow.insertCell(4).textContent = acceptedTerms;

            // Clear the form after submission
            document.getElementById('registration-form').reset();
        });
    </script>
</body>
</html>
