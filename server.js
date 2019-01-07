const express = require("express");
const path = require("path");
const firebase = require("firebase");
const axios = require("axios");

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));
// var config = {
//     apiKey: "AIzaSyBikhUuxvdby-jvrW45ozvAMHbjN7W8_EQ",
//     authDomain: "project-reconnect.firebaseapp.com",
//     databaseURL: "https://project-reconnect.firebaseio.com",
//     projectId: "project-reconnect",
//     storageBucket: "project-reconnect.appspot.com",
//     messagingSenderId: "412974593069"
//   };
// firebase.initializeApp(config);

// firebase.database().ref(`/invitations`).on('value', snapshot => {
//     const usersRef = firebase.database().ref('users');
//     const data = snapshot.val();
//     // sendEmail();
// })

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port);
console.log("Server started at  port " + port);
