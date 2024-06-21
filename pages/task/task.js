firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // Redirecionar para a página de login se o usuário não estiver autenticado
        window.location.href = "../auth/login.html";
    }
});

if (!isNewTask()) {
    const uid = getTaskUid();
    findTaskByUid(uid);
}

function getTaskUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function isNewTask() {
    return !getTaskUid();
}

function findTaskByUid(uid) {
    showLoading();

    firebase.firestore()
        .collection("tasks")
        .doc(uid)
        .get()
        .then(doc => {
            hideLoading();
            if (doc.exists) {
                console.log(doc.data());
                // o código para preencher o formulário com os dados da tarefa
                fillFormWithTaskData(doc.data());
                toggleSaveButtonDisable();
            } else {
                alert("Documento não encontrado");
                window.location.href = "../home/home.html";
            }
        })
        .catch(error => {
            hideLoading();
            console.error("Erro ao recuperar documento:", error);
            alert('Erro ao recuperar documento');
            window.location.href = "../home/home.html";
            
        });
}

function saveTask() {
    showLoading();

    const user = firebase.auth().currentUser;

    if (user) {
        const task = createTask(user);

        if (isNewTask()) {
            firebase.firestore()
                .collection('tasks')
                .add(task)
                .then(() => {
                    hideLoading();
                    window.location.href = "../home/home.html";
                })
                .catch(() => {
                    hideLoading();
                    alert('Erro ao salvar tarefa');
                });
        } else {
            const uid = getTaskUid();
            firebase.firestore()
                .collection('tasks')
                .doc(uid)
                .update(task)
                .then(() => {
                    hideLoading();
                    window.location.href = "../home/home.html";
                })
                .catch(() => {
                    hideLoading();
                    alert('Erro ao atualizar tarefa');
                });
        }
    } else {
        hideLoading();
        alert('Usuário não autenticado');
        window.location.href = "../auth/login.html";
    }
}

function createTask(user) {
    return {
        type: form.typeOpen().checked ? "expense" : "closed",
        date: form.date().value,
        taskType: form.taskType().value,
        description: form.description().value,
        user: {
            uid: user.uid
        }
    };
}

function fillFormWithTaskData(task) {
    form.date().value = task.date;
    form.taskType().value = task.taskType;
    form.description().value = task.description;
    if (task.type === "closed") {
        form.typeClosed().checked = true;
    } else {
        form.typeOpen().checked = true;
    }
}

function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable();
}

function onChangeTaskType() {
    const taskType = form.taskType().value;
    form.taskTypeRequiredError().style.display = !taskType ? "block" : "none";

    toggleSaveButtonDisable();
}

function toggleSaveButtonDisable() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value;
    if (!date) {
        return false;
    }

    const taskType = form.taskType().value;
    if (!taskType) {
        return false;
    }

    return true;
}

const form = {
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    description: () => document.getElementById('description'),
    taskType: () => document.getElementById('task-type'),
    taskTypeRequiredError: () => document.getElementById('task-type-required-error'),
    typeOpen: () => document.getElementById('open'),
    typeClosed: () => document.getElementById('closed'),
    saveButton: () => document.getElementById('save-button'),
}

/*function showLoading() {
    // Adicione aqui a lógica para mostrar o carregamento
    console.log('Loading...');
}

function hideLoading() {
    // Adicione aqui a lógica para esconder o carregamento
    console.log('Loading finished.');
}*/


/*firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // Redirecionar para a página de login se o usuário não estiver autenticado
        window.location.href = "../auth/login.html";
    }
});

getTaskUid();

if(!isNewTask()) {
    const uid = getTaskUid();
    findTaskByUid(uid);
}

function getTaskUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function isNewTask() {
    return getTaskUid() ? false : true;
}

function findTaskByUid(uid) {
    showLoading();

    firebase.firestore()
        .collection("tasks")
        .doc(uid)
        .then(doc => {
            if (doc.exists) {
                console.log(doc.data());
            } else {
                alert("Documento nao encontrado");
                window.location.href = "../home/home.html";
            }
        });
}

function saveTask() {
    showLoading();

    const user = firebase.auth().currentUser;

    if (user) {
        const task = createTask(user);

        firebase.firestore()
            .collection('tasks')
            .add(task)
            .then(() => {
                hideLoading();
                window.location.href = "../home/home.html";
            })
            .catch(() => {
                hideLoading();
                alert('Erro ao salvar tarefa');
            });
    } else {
        hideLoading();
        alert('Usuário não autenticado');
        window.location.href = "../auth/login.html";
    }
}

function createTask(user) {
    return {
        type: form.typeOpen().checked ? "expense" : "closed",
        date: form.date().value,
        taskType: form.taskType().value,
        description: form.description().value,
        user: {
            uid: user.uid
        }
    };
}

function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable();
}

function onChangeTaskType() {
    const taskType = form.taskType().value;
    form.taskTypeRequiredError().style.display = !taskType ? "block" : "none";

    toggleSaveButtonDisable();
}

function toggleSaveButtonDisable() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value;
    if (!date) {
        return false;
    }

    const taskType = form.taskType().value;
    if (!taskType) {
        return false;
    }

    return true;
}

const form = {
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    description: () => document.getElementById('description'),
    taskType: () => document.getElementById('task-type'),
    taskTypeRequiredError: () => document.getElementById('task-type-required-error'),
    typeOpen: () => document.getElementById('open'),
    saveButton: () => document.getElementById('save-button'),
}


/*function saveTask() {
    showLoading();

    const task = createTask();

    firebase.firestore()
        .collection('tasks')
        .add(task)
        .then(() => {
            hideLoading();
            window.location.href = "../home/home.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao salvar tarefa');
        })
}

function createTask() {
    return {
        type: form.typeOpen().checked ? "expense" : "closed",
        date: form.date().value,
        taskType: form.taskType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}

function saveTask() {
    showLoading();

    const user = firebase.auth().currentUser;

    if (user) {
        const task = createTask(user);

        firebase.firestore()
            .collection('tasks')
            .add(task)
            .then(() => {
                hideLoading();
                window.location.href = "../home/home.html";
            })
            .catch(() => {
                hideLoading();
                alert('Erro ao salvar tarefa');
            });
    } else {
        hideLoading();
        alert('Usuário não autenticado');
        // Redirecionar para a página de login se necessário
        window.location.href = "../auth/login.html";
    }
}

function createTask(user) {
    return {
        type: form.typeOpen().checked ? "expense" : "closed",
        date: form.date().value,
        taskType: form.taskType().value,
        description: form.description().value,
        user: {
            uid: user.uid
        }
    };
}

function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable();
}

function onChangeTaskType() {
    const taskType = form.taskType().value;
    form.taskTypeRequiredError().style.display = !taskType ? "block" : "none";

    toggleSaveButtonDisable();
}

function toggleSaveButtonDisable() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value;
    if (!date) {
        return false;
    }

    const taskType = form.taskType().value;
    if (!taskType) {
        return false;
    }

    return true;
}

const form = {
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    description: () => document.getElementById('description'),
    taskType: () => document.getElementById('task-type'),
    taskTypeRequiredError: () => document.getElementById('task-type-required-error'),
    typeOpen: () => document.getElementById('open'),
    saveButton: () => document.getElementById('save-button'),
}*/
