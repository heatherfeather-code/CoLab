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


// TASKS SCRIPT

const tasks = [];

const taskList = document.getElementById('taskList');
const completedList = document.getElementById('completedList');
const newTaskBtn = document.getElementById('newTaskBtn');
const taskModal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const taskForm = document.getElementById('taskForm');

// Open modal
newTaskBtn.addEventListener('click', () => {
  taskModal.classList.remove('hidden');
});

// Close modal
closeModal.addEventListener('click', () => {
  taskModal.classList.add('hidden');
});

// Submit new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const task = {
    name: document.getElementById('taskName').value,
    priority: document.getElementById('priority').value,
    dueDate: document.getElementById('dueDate').value,
    project: document.getElementById('project').value,
    completed: false,
  };
  
  tasks.push(task);
  renderTasks();
  taskForm.reset();
  taskModal.classList.add('hidden');
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  completedList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
      <strong>${task.name}</strong> (${task.priority})
      <small>${task.dueDate ? task.dueDate : ''} ${task.project !== 'No' ? `| ${task.project}` : ''}</small>
    `;
    
    if (task.completed) {
      completedList.appendChild(li);
    } else {
      taskList.appendChild(li);
    }
  });
}

// Toggle completed
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Filter (bonus: you can add this if you want!)
const filters = document.querySelectorAll('.filter');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    applyFilter(button.dataset.filter);
  });
});

function applyFilter(filter) {
  // basic idea - could expand
  if (filter === "high") {
    renderFiltered(task => task.priority === "High");
  } else if (filter === "soon") {
    renderFiltered(task => {
      if (!task.dueDate) return false;
      const now = new Date();
      const due = new Date(task.dueDate);
      const diff = (due - now) / (1000 * 60 * 60 * 24);
      return diff <= 7; // due within 7 days
    });
  } else if (filter === "projects") {
    renderFiltered(task => task.project !== "No");
  } else {
    renderTasks();
  }
}

function renderFiltered(filterFn) {
  taskList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach((task, index) => {
    if (filterFn(task)) {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
        <strong>${task.name}</strong> (${task.priority})
        <small>${task.dueDate ? task.dueDate : ''} ${task.project !== 'No' ? `| ${task.project}` : ''}</small>
      `;
      if (task.completed) {
        completedList.appendChild(li);
      } else {
        taskList.appendChild(li);
      }
    }
  });
}
