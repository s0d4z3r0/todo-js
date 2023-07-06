const tarefa = document.querySelector("#tarefa");
const addTarefa = document.querySelector("#addTarefa");
const tarefas = document.querySelector("#tarefas");

// Criar DIV
const addDiv = () => {
  const div = document.createElement("div");
  div.classList.add("task");
  return div;
};
// Criar botão delete dentro da DIV
const deleteDivBtn = () => {
  const delBtn = document.createElement("button");
  delBtn.classList.add("delete");
  delBtn.innerText = "APAGAR";
  return delBtn;
};
// Limpar inputs
const clearInput = () => {
  tarefa.value = "";
  tarefa.focus();
};

// Criar tarefa
const createTask = (task) => {
    const div = addDiv();
    const delBtn = deleteDivBtn();
    div.innerText = task;
    tarefas.appendChild(div);
    div.appendChild(delBtn);
    clearInput();
    saveTask();
}

// Deletar tarefas
const deleteTask = (e) => {
  const divDel = e.target;

  divDel.classList.contains("delete") ? divDel.parentElement.remove() : "";
  saveTask();
};

// Salvar tarefas
const saveTask = () => {
  const tasks = tarefas.querySelectorAll("div");
  let listTasks = [];

  for (let task of tasks) {
    let taskText = task.innerText;
    taskText = taskText.replace("APAGAR", "").trim();

    listTasks.push(taskText);
  }

  const tasksJSON = JSON.stringify(listTasks)
  localStorage.setItem('tasks', tasksJSON)
};

// Adicionar tarefas salvas
const addSavedTask = () => {
    const tasks = localStorage.getItem('tasks')
    const listTasks = JSON.parse(tasks)
    
    for(let task of listTasks){
        createTask(task)
    }
}
addSavedTask()

const handleSubmit = (e) => {
  e.preventDefault();
  if (!tarefa.value) {
    return;
  } else {
    createTask(tarefa.value)
  }
};

addTarefa.addEventListener("click", handleSubmit);
document.addEventListener("click", deleteTask);
