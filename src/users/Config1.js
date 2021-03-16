import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyD5XRCdAxuZ6FkJw1849jzSiE4c1KA7CVk",
    authDomain: "zeeuniapp.firebaseapp.com",
    databaseURL: "https://zeeuniapp.firebaseio.com",
    projectId: "zeeuniapp",
    storageBucket: "zeeuniapp.appspot.com",
    messagingSenderId: "1070389336688",
    appId: "1:1070389336688:web:24ae5b1c80b122b9e432b5"
};
let firebase = Firebase.initializeApp(config);
export default firebase