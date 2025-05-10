// without using local storage

document.getElementById('addbtn').addEventListener('click', function () {
    const input = document.getElementById('input-text');
    const todoText = input.value.trim();

    if (todoText === '') return;

    // Create elements
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = todoText;

    const deletebtn = document.createElement('button');
    deletebtn.innerText = 'Delete';
    deletebtn.className = 'Deletebtn';
    deletebtn.addEventListener('click', () => li.remove());

    const editbtn = document.createElement('button');
    editbtn.innerText = 'Edit';
    editbtn.className = 'Editbtn';

    editbtn.addEventListener('click', () => {
        const currentText = span.innerText;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
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
                span.innerText = newValue;
            }
            li.innerHTML = '';
            li.appendChild(span);
            li.appendChild(deletebtn);
            li.appendChild(editbtn);
        });

        input.focus();
    });

    // Append elements to li
    li.appendChild(span);
    li.appendChild(deletebtn);
    li.appendChild(editbtn);

    document.getElementById('todo-list').appendChild(li);

    input.value = '';
});
