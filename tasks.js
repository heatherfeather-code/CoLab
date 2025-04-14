// script.js

document.addEventListener('DOMContentLoaded', () => {
  const newTaskButton = document.querySelector('.new-task-button');
  const modal = document.querySelector('.modal');
  const closeModal = document.querySelector('.close-modal');
  const createTaskButton = document.querySelector('.create-task');
  const taskList = document.querySelector('.upcoming-tasks');
  
  newTaskButton.addEventListener('click', () => {
    modal.classList.add('open');
  });
  
  closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
  });
  
  createTaskButton.addEventListener('click', () => {
    const taskName = document.querySelector('#task-name').value;
    const priority = document.querySelector('#priority').value;
    const dueDate = document.querySelector('#due-date').value;
    const project = document.querySelector('#project').value;
    const assigned = document.querySelector('#assigned').value;
    
    if (taskName && dueDate) {
      const taskCard = document.createElement('div');
      taskCard.classList.add('task-card');
      
      taskCard.innerHTML = `
        <div class="task-left">
          <input type="checkbox">
          <div class="task-info">
            <h3>${taskName}</h3>
            <p>${new Date(dueDate).toLocaleDateString()} <span class="priority ${priority.toLowerCase()}">${priority}</span></p>
            <p>Project: ${project !== "No" ? project : "None"}</p>
          </div>
        </div>
        <div class="task-avatars">
          <img src="avatar-placeholder.png" alt="Assigned Avatar" class="avatar">
        </div>
      `;
      
      taskList.appendChild(taskCard);
      modal.classList.remove('open');
      
      document.querySelector('#task-name').value = "";
      document.querySelector('#priority').value = "High";
      document.querySelector('#due-date').value = "";
      document.querySelector('#project').value = "No";
      document.querySelector('#assigned').value = "Jane Doe";
    }
  });
});
