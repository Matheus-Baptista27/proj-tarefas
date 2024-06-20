function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

firebase.auth().onAuthStateChanged(user => {
    if (user){
        findTasks(user);
    }
})

function newTask() {
    window.location.href = "../task/task.html";
}

function findTasks (user) {
    showLoading();
    firebase.firestore()
        .collection('tasks')
        .where('user.uid','==',user.uid)
        .orderBy('date','desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const tasks = snapshot.docs.map(doc => doc.data());
            addTasksToScreen(tasks);
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar transacoes');
        })
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
