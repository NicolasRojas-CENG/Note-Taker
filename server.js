//Importing Express.js
const express = require("express");
//Importing the database.
const db = require("./db/db.json");
//Importhing path module.
const path = require('path');

const fs = require('fs');
const { json } = require("body-parser");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/notes.html')));

app.route('/api/notes')
.get((req, res) => readFromFile(false, null, res))
.post((req, res) =>  readFromFile(true, req.body, res));

app.get('/*/', (req, res) => res.redirect('/index.html'))

const writeToFile = (data, body, res) => {
    data.push(body);
    addId(data);
    data = JSON.stringify(data);
    console.log(data);
    fs.writeFile("./db/db.json", data, function (err) {
        (err ? res.send('Something went wrong!') : res.send('Task was successfully saved!'));
    });
}

const readFromFile = (write, body, res) => {
    let data = fs.readFileSync('./db/db.json', 'utf-8');
    data = JSON.parse(data);
    (write ? writeToFile(data, body, res): res.send(data));
}

const addId = (data , body) => {
    var id = 0;
    console.log(id);
    data.forEach(element => {
        element["id"] = id++;
    });
    return data;
}

app.listen(PORT, () => console.log(`API server now on port ${PORT}!`));