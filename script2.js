// using local storage

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const inputBox = document.getElementById('input-text');
const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('addbtn');

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodo(todoText, index) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = todoText;

    // Delete Button
    const deletebtn = document.createElement('button');
    deletebtn.innerText = 'Delete';
    deletebtn.className = 'Deletebtn';
    deletebtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderAllTodos();
    });

    // Edit Button
    const editbtn = document.createElement('button');
    editbtn.innerText = 'Edit';
    editbtn.className = 'Editbtn';
    editbtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.innerText;
        input.className = 'edit-input';

        const savebtn = document.createElement('button');
        savebtn.innerText = 'Save';
        savebtn.className = 'save-btn';

        li.innerHTML = '';
        li.appendChild(input);
        li.appendChild(savebtn);

        savebtn.addEventListener('click', () => {
            const newValue = input.value.trim();
            if (newValue !== '') {
                todos[index] = newValue;
                saveTodos();
                renderAllTodos();
            }
        });

        input.focus();
    });

    // Append all
    li.appendChild(span);
    li.appendChild(deletebtn);
    li.appendChild(editbtn);
    todoList.appendChild(li);
}

function renderAllTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => renderTodo(todo, index));
}

// On add
addBtn.addEventListener('click', () => {
    const todoText = inputBox.value.trim();
    if (todoText === '') return;

    todos.push(todoText);
    saveTodos();
    renderAllTodos();
    inputBox.value = '';
});

// Initial render
renderAllTodos();
