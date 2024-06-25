const TaskService = {
    findByUser: user => {
        return firebase.firestore()
            .collection('tasks')
            .where('user.uid', '==', user.uid)
            .orderBy('date', 'desc')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            });
    },

    findByUid: uid => {
        return firebase.firestore()
            .collection("tasks")
            .doc(uid)
            .get()
            .then(doc => {
                return doc.exists ? { ...doc.data(), uid: doc.id } : null;
            });
    },

    remove: task => {
        return firebase.firestore()
            .collection("tasks")
            .doc(task.uid)
            .delete();
    },

    save: task => {
        return firebase.firestore()
            .collection('tasks')
            .add(task);
    },

    update: (task, uid) => {
        return firebase.firestore()
            .collection('tasks')
            .doc(uid)
            .set(task, { merge: true});
    }
};


// Exportando TaskService globalmente
window.TaskService = TaskService;
