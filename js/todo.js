const deleteAll = document.querySelector("#delete-all");
const todoList = document.querySelector(".todo-list");
const firstInput = document.querySelector("#first-todo");

deleteAll.addEventListener("click", () => {
    const target = todoList.querySelectorAll("li").length;
    let i = 0;
    while(i<target-1) {
        todoList.querySelector("li").remove();
        i++;
    }
});

firstInput.addEventListener("keypress", (e) => {
    if(e.keyCode === 13) {
        if (firstInput.value.trim() === "") {
            alert("할 일을 입력해 주세요.");
            todoInput.value = "";
            return false;
        }
        addTodo(firstInput.value, e);
        generateTodo();
    }
});

const addTodo = (todo, $elem) => {
    const likeSpan = generateLike();
    const manageSpan = generateManage();
    $elem.target.parentNode.innerText = todo;
    $elem.path[2].prepend(likeSpan);
    $elem.path[2].appendChild(manageSpan);
}

const generateTodo = () => {
    const li = document.createElement("li");
    const itemSpan = generateItem();
    li.appendChild(itemSpan);
    todoList.appendChild(li);
}

const generateLike = () => {
    const span = document.createElement("span");
    span.classList.add("todo-like");

    const icon_like = generateIcon("like", "favorite_border");
    span.appendChild(icon_like);
    span.addEventListener("click", () => {
        icon_like.innerText === 'favorite_border' ?
        icon_like.innerText = 'favorite' : icon_like.innerText = 'favorite_border';
    });
    return span;
}

const generateItem = () => {
    const span = document.createElement("span");
    span.classList.add("todo-item");
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("todo-input");
    input.addEventListener("keypress", (e) => {
        if(e.keyCode === 13) {
            if (input.value.trim() === "") {
                alert("할 일을 입력해 주세요.");
                input.value = "";
                return false;
            }
            addTodo(input.value, e);
            generateTodo();
        }
    });
    span.appendChild(input);
    return span;
}

const generateManage = () => {
    const span = document.createElement("span");
    span.classList.add("todo-manage");

    const icon_check = generateIcon("check", "check");
    const icon_clear = generateIcon("clear", "clear");
    span.appendChild(icon_check);
    span.appendChild(icon_clear);

    generateDoneClickEvent(icon_check);
    generateClearClickEvent(icon_clear);
    return span;
}

const generateIcon = (_class, _name) => {
    const icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.classList.add(_class);
    icon.innerText = _name;
    return icon;
}

const generateDoneClickEvent = ($elem) => {
    $elem.addEventListener("click", (e) => {
        const li = e.target.parentNode.parentNode;
        li.classList.add("done");
    });
}

const generateClearClickEvent = ($elem) => {
    $elem.addEventListener("click", (e) => {
        const li = e.target.parentNode.parentNode;
        todoList.removeChild(li);
    });
}