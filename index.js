
 
  document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

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
   const retrieve = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};


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

    // Save to localStorage and update table
    addEntryToLocalStorage(name, email, password, dobInput, terms);
    console.log('Entry saved to localStorage:', { name, email, password, dobInput, terms });

    updateTable();
    console.log('Table updated after submission');
});

function addEntryToLocalStorage(name, email, password, dob, terms) {
    let entries = JSON.parse(localStorage.getItem('formEntries')) || [];
    entries.push({ name, email, password, dob, terms });
    localStorage.setItem('formEntries', JSON.stringify(entries));
    console.log('localStorage updated:', localStorage.getItem('formEntries'));
}

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
    console.log('Table content updated:', entries);
}

// Load data from localStorage when the page loads
window.onload = updateTable;
function addEntryToLocalStorage(name, email, password, dob, terms) {
    let entries = JSON.parse(localStorage.getItem('formEntries')) || [];
    entries.push({ name, email, password, dob, terms });
    localStorage.setItem('formEntries', JSON.stringify(entries)); // Save as an array
}
