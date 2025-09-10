let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const taskDateTime = document.getElementById('taskDateTime');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const accountBtn = document.getElementById('accountBtn');
const accountDropdown = document.getElementById('accountDropdown');

// Toggle Account Dropdown
accountBtn.addEventListener('click', () => {
    accountDropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
        accountDropdown.classList.add('hidden');
    }
});

// Add Task
addTaskBtn.addEventListener('click', () => {
    const description = taskInput.value.trim();
    const dateTime = taskDateTime.value;
    if (description) {
        const task = {
            id: Date.now(),
            description,
            dateTime: dateTime || null,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskDateTime.value = '';
    }
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `bg-white p-4 rounded-xl shadow-md flex justify-between items-center ${task.completed ? 'opacity-60 bg-gray-100' : 'hover-scale'} animate-fadeIn border border-gray-200`;
        taskElement.innerHTML = `
            <div class="flex items-center space-x-3">
                <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle-completed h-5 w-5 text-purple-500 focus:ring-purple-500 rounded">
                <div>
                    <p class="text-gray-800 font-medium ${task.completed ? 'line-through text-gray-500' : ''}">${task.description}</p>
                    ${task.dateTime ? `<p class="text-sm text-gray-500">${new Date(task.dateTime).toLocaleString()}</p>` : ''}
                </div>
            </div>
            <div class="flex space-x-3">
                <button class="edit-task text-purple-600 hover:text-purple-800 font-medium transition-colors">Edit</button>
                <button class="delete-task text-red-600 hover:text-red-800 font-medium transition-colors">Delete</button>
            </div>
        `;
        taskList.appendChild(taskElement);

        taskElement.querySelector('.toggle-completed').addEventListener('change', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        taskElement.querySelector('.edit-task').addEventListener('click', () => {
            const newDescription = prompt('Edit task description:', task.description);
            if (newDescription !== null && newDescription.trim()) {
                task.description = newDescription.trim();
                saveTasks();
                renderTasks();
            }
        });

        taskElement.querySelector('.delete-task').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });
    });
}

// Initial Render
renderTasks();
