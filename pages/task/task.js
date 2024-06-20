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

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // Redirecionar para a página de login se o usuário não estiver autenticado
        window.location.href = "../auth/login.html";
    }
});

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
