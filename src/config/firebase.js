var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "AIzaSyCJzuNNOeeTEukHFbpjvMPrR4zI9KSTm-o",
    authDomain: "gupshup-df8c5.firebaseapp.com",
    databaseURL: "https://gupshup-df8c5.firebaseio.com",
    projectId: "gupshup-df8c5",
    storageBucket: "gupshup-df8c5.appspot.com",
    messagingSenderId: "237645701062"
});

var base = Rebase.createClass(app.database());

export default base;
