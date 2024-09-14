 // Form submission handling
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dobInput = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate age (18-55)
    const dob = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    if (age < 18 || age > 55) {
        alert('Date of birth must indicate an age between 18 and 55.');
        return; // Stop form processing
    }

    // Add entry to localStorage
    addEntryToLocalStorage(name, email, password, dobInput, terms);
    
    // Update table immediately after submission
    updateTable();
});

// Add new entry to localStorage
function addEntryToLocalStorage(name, email, password, dob, terms) {
    let entries = JSON.parse(localStorage.getItem('formEntries')) || [];
    entries.push({ name, email, password, dob, terms });
    localStorage.setItem('formEntries', JSON.stringify(entries));
}

// Update table with all entries from localStorage
function updateTable() {
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear the table first

    const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
    entries.forEach(entry => {
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = entry.name;
        newRow.insertCell(1).textContent = entry.email;
        newRow.insertCell(2).textContent = entry.password;
        newRow.insertCell(3).textContent = entry.dob;
        newRow.insertCell(4).textContent = entry.terms ? 'Yes' : 'No';
    });
}

// Load table on page load
window.onload = updateTable;
