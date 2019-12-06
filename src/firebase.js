import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB1Dd25PjveV_XQv2uy6GUaC0COVnH1ySI",
    authDomain: "ads1-aa8c2.firebaseapp.com",
    databaseURL: "https://ads1-aa8c2.firebaseio.com",
    projectId: "ads1-aa8c2",
    storageBucket: "ads1-aa8c2.appspot.com",
    messagingSenderId: "642973696291",
    appId: "1:642973696291:web:ca8116516cc76ea8dd4c96",
    measurementId: "G-YB9PMXXQ44"
  };

  export const firebaseImpl = firebase.initializeApp(firebaseConfig);
  export const firebaseDatabase = firebase.database();
  export {firebase};