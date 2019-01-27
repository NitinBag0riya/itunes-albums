var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
    apiKey: "XXXXXX",
    authDomain: "XXXXXXX",
    databaseURL: "XXXXX",
    projectId: "XXXXXXXX",
    storageBucket: "XXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXX"
});

var base = Rebase.createClass(app.database());

export default base;
