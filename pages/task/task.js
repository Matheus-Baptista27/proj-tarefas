function saveTask() {
    const task = {
        type: form.typeOpen().checked ? "open" : "closed",
        date: form.date().value,
        taskType: form.taskType().value,
        description: form.description().value
    }

    console.log(task);
}


function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable();
}

function onChangeTaskType () {
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
    description: () => document.getElementById('description'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    saveButton: () => document.getElementById('save-button'),
    taskType: () => document.getElementById('task-type'),
    taskTypeRequiredError: () => document.getElementById('task-type-required-error'),
    taskOpen: () => document.getElementById('open'),
}