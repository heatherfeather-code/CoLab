// Toggle form visibility
function showForm(type) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

// Get users from localStorage
const getUsers = () => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : {};
};

// Save users to localStorage
const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

// Register new user
function register() {
    const username = document.getElementById('newUser').value.trim();
    const password = document.getElementById('newPassword').value.trim();

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    const users = getUsers();

    if (users[username]) {
        alert("Username already exists!");
    } else {
        users[username] = { password };
        saveUsers(users);
        alert("Registration successful!");
        document.getElementById('newUser').value = '';
        document.getElementById('newPassword').value = '';
        showForm('login'); // Switch to login
    }
}

// Login user
function login() {
    console.log("login function triggered!");
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const users = getUsers();

    if (users[username] && users[username].password === password) {
        // alert(`Welcome back, ${username}!`);
        localStorage.setItem("loggedInUser", username);
        window.location.href = "schedule.html";
    } else {
        alert("Invalid username or password.");
    }
}
