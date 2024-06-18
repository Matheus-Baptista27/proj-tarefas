function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

findTasks();

function findTasks () {
    setTimeout(() => {
        addTasksToScreen(fakeTasks);
    }, 1000)
}
function addTasksToScreen(tasks) {
    const orderedList = document.getElementById('tasks');

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.type);

        const date = document.createElement('p');
        date.innerHTML = formatDate(task.date);
        li.appendChild(date);

        const type = document.createElement('p');
        type.innerHTML = task.taskType;
        li.appendChild(type);

        if (task.description) {
            const description = document.createElement('p');
            description.innerHTML = task.description;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
    
}


function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

const fakeTasks = [
    {
    type: 'open',
    date: '2024-01-04',
    taskType: 'Descrição da Tarefa',
    description: 'Alguma descrição'
},
{
    type: 'closed',
    date: '2024-01-03',
    taskType: 'Jogar bola com os amigos',
    description: ''
},
{
    type: 'open',
    date: '2024-01-02',
    taskType: 'Ir na academia X vezes',
    description: 'Alguma descrição 2'
},
{
    type: 'closed',
    date: '2024-01-01',
    taskType: 'Descansar bastante',
    description: ''
}
]