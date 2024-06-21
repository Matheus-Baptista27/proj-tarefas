/*function logout() {
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
        .where('user.uid','==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const tasks = snapshot.docs.map(doc => doc.data());
            addTasksToScreen(tasks);
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar tarefas');
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
}*/

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    });
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTasks(user);
    }
});

function newTask() {
    window.location.href = "../task/task.html";
}

function findTasks(user) {
    showLoading();
    firebase.firestore()
        .collection('tasks')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const tasks = snapshot.docs.map(doc => ({ 
                ...doc.data(),
            uid: doc.id
        }));
            addTasksToScreen(tasks);
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar tarefas');
        });
}

function addTasksToScreen(tasks) {
    const orderedList = document.getElementById('tasks');
    orderedList.innerHTML = ''; 

    tasks.forEach(task => {
        console.log(task);
        const li = document.createElement('li');
        li.classList.add(task.type === 'closed' ? 'closed' : 'open');
        li.addEventListener('click', () => {
            window.location.href = "../task/task.html?uid=" + task.uid;
        })

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Remover";
        deleteButton.classList.add('outline', 'danger');
        li.appendChild(deleteButton);

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
    return new Date(date).toLocaleDateString('pt-BR');
}

/*function showLoading() {
    
    console.log('Loading...');
}

function hideLoading() {
    
    console.log('Loading finished.');
}*/

