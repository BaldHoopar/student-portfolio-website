// ==========================================================================
// ACADEMIC PLANNER DASHBOARD ENGINE
// ==========================================================================

// 1. App State - Load existing tasks from LocalStorage or start empty
let tasks = JSON.parse(localStorage.getItem('academic_tasks')) || [];
let currentFilter = 'all';

// 2. DOM Elements Selection
const taskForm = document.getElementById('taskForm');
const taskListContainer = document.getElementById('taskListContainer');
const currentViewTitle = document.getElementById('currentViewTitle');

// Filter Badges
const countAll = document.getElementById('countAll');
const countPending = document.getElementById('countPending');
const countCompleted = document.getElementById('countCompleted');

// Filter Cards
const filterCards = document.querySelectorAll('.metrics-container .metric-card');

// 3. Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    setupFilters();
});

// 4. Form Submission Event Handler
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload

    // Extract input fields safely
    const title = document.getElementById('taskTitle').value.trim();
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const notes = document.getElementById('taskNotes').value.trim();

    // Create unique task object
    const newTask = {
        id: Date.now().toString(), // Generates clean unique ID string
        title,
        category,
        priority,
        dueDate,
        notes,
        completed: false
    };

    // Update state and storage
    tasks.push(newTask);
    saveTasksToStorage();
    
    // Reset form fields cleanly
    taskForm.reset();
    renderDashboard();
});

// 5. Render Core Engine Components
function renderDashboard() {
    updateBadges();
    renderTaskList();
}

// 6. Calculate & Update Metrics Count Badges
function updateBadges() {
    const total = tasks.length;
    const pending = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    if (countAll) countAll.textContent = total;
    if (countPending) countPending.textContent = pending;
    if (countCompleted) countCompleted.textContent = completed;
}

// 7. Render Task Cards to HTML Board Container
function renderTaskList() {
    taskListContainer.innerHTML = '';

    // Filter tasks based on selected metric mode
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'pending') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all'
    });

    // Handle Empty Dashboard State
    if (filteredTasks.length === 0) {
        taskListContainer.innerHTML = `<p class="empty-msg">No ${currentFilter === 'all' ? '' : currentFilter} tasks found. Keep up the good work!</p>`;
        return;
    }

    // Loop and construct HTML cards dynamically
    filteredTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-item-card ${task.completed ? 'task-completed' : ''}`;
        
        // Dynamic inner template with clean control structures
        taskCard.innerHTML = `
            <div class="task-item-card__content">
                <div class="task-item-card__meta">
                    <span class="category-badge">${task.category || 'General'}</span>
                    <span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority} Priority</span>
                </div>
                <h3 class="task-item-card__title">${task.title}</h3>
                <p class="task-item-card__date"><i class="fa-regular fa-calendar"></i> Due: ${task.dueDate}</p>
                ${task.notes ? `<p class="task-item-card__notes">${task.notes}</p>` : ''}
            </div>
            <div class="task-item-card__actions">
                <button onclick="toggleTaskStatus('${task.id}')" class="action-btn status-btn" aria-label="Toggle Complete Status">
                    <i class="${task.completed ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
                </button>
                <button onclick="deleteTask('${task.id}')" class="action-btn delete-btn" aria-label="Delete Task">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        taskListContainer.appendChild(taskCard);
    });
}

// 8. Interactive Control Actions: Toggle Completion State
window.toggleTaskStatus = function(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasksToStorage();
    renderDashboard();
};

// 9. Interactive Control Actions: Delete Task
window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToStorage();
    renderDashboard();
};

// 10. Configure Metric Summary Filters Click Events
function setupFilters() {
    filterCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active style state across cards
            filterCards.forEach(c => c.classList.remove('active-filter'));
            
            // Apply active class style to selection
            card.classList.add('active-filter');
            
            // Set dynamic filters and updates titles
            currentFilter = card.getAttribute('data-filter');
            const viewName = card.querySelector('h3').textContent;
            currentViewTitle.textContent = `Showing ${viewName}`;
            
            renderTaskList();
        });
    });
}

// 11. Helper Persistence Storage Function
function saveTasksToStorage() {
    localStorage.setItem('academic_tasks', JSON.stringify(tasks));
}