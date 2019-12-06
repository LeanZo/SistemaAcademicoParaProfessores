import {firebaseDatabase, firebase} from '../firebase'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {

        let query = firebaseDatabase.ref(nodePath);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });
        // O Retorno nunca foi usado e causava erro com o React.useEvent(), que foi utilizada em DiscAlunoAdd ;)
        // return query;
    };

    static pushData = (node, key, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).child(key);
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

    static remove = (id, node) => {
        return firebaseDatabase.ref(node + '/' + id).remove();
    };

    static getUniqueDataBy = (node, id, callback) => {
        const ref = firebaseDatabase.ref(node + '/' + id);
        let newData = {};
        ref.once('value', (dataSnapshot) => {

            if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
                callback(null);
                return;
            }

            const snap = dataSnapshot.val();
            const keys = Object.keys(snap);
            keys.forEach((key) => {
                newData[key] = snap[key]
            });
        }).then(() => {
            callback(newData);
        });
    };

    static updateData = (id, node, obj) => {
        return firebaseDatabase.ref(node + '/' + id).set({...obj});
    };

    static createUser = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };
    
    static login = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    
    static logout = () => {
        localStorage.removeItem('email');
        return firebase.auth().signOut();
    };
    
    static onAuthChange = (callbackLogin, callbackLogout) => {
        firebase.auth().onAuthStateChanged(authUser => {
            if (!authUser) {
                callbackLogout(authUser);
            } else {
                callbackLogin(authUser);
            }
        });
    };

}