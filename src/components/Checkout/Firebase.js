import firebase from 'firebase';
const config={
    apiKey: "AIzaSyBhAOYaIKfarjDi_gzU85dHZArdyJEgFqw",
    authDomain: "grocery-cf07d.firebaseapp.com",
    projectId: "grocery-cf07d",
    storageBucket: "grocery-cf07d.appspot.com",
    messagingSenderId: "813325715164",
    appId: "1:813325715164:web:88b86d6ee1a461f0ea1619",
    measurementId: "G-TGHV835HEG"
}

firebase.initializeApp(config)
export const auth=firebase.auth()
export default firebase
