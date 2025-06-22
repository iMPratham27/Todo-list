
function createTodo(todoText){

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = todoText; // copy input into span

    // delete
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "DeleteBtn";
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTodos(); // Save after delete
    });

    // edit
    const editBtn = document.createElement("button");
    editBtn.className = "EditBtn";
    editBtn.innerText = "Edit";

    editBtn.addEventListener("click", function(){

        const currentText = span.innerText;

        // new input
        const newInput = document.createElement("input");
        newInput.value = currentText;
        newInput.type = "text";
        newInput.className = "edit-input";

        // save
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.className = "SaveBtn";

        li.innerHTML = '';
        li.appendChild(newInput);
        li.appendChild(saveBtn);

        saveBtn.addEventListener("click", function(){

            const newValue = newInput.value.trim();

            if(newValue !== ''){
                span.innerText = newValue;
            }

            li.innerHTML = '';
            li.appendChild(span);
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
        });

    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    document.getElementById("todo-list").append(li);    
}

// save todos to Local Storage
function saveTodos(){

    const items = []; // array to collect all the todo task texts
    
    document.querySelectorAll("#todo-list li span").forEach(span => {
        items.push(span.innerText); // add text to array
    });
    
    localStorage.setItem("todos", JSON.stringify(items)); // localStorage.setItem(key, value)
}

// load todos from Local Storage
function loadTodos(){

    // turns the saved string back into an actual array
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach( todo => {
        createTodo(todo);
    });
}


document.getElementById("addBtn").addEventListener("click", function(){

    const input = document.getElementById("input-text");
    const todoText = input.value.trim();

    if(todoText === ''){
        return;
    }

    createTodo(todoText);
    saveTodos();

    input.value = '';
});

loadTodos();