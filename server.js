//Importing Express.js
const express = require("express");
//Importing the database.
const db = require("./db/db.json");
//Importhing path module.
const path = require('path');

const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/notes.html')));

app.route('/api/notes')
.get((req, res) => res.json(db))
.post((req, res) =>  writeToFile(req.body));

const writeToFile = body => {
    console.log(body);
    db.push(body);
    var entries = JSON.stringify(db);
    fs.writeFile("./db/db.json", entries, function (err) {
        if (err) throw err;
        console.log('Task was successfully saved!');
    });
}

app.listen(PORT, () => console.log(`API server now on port ${PORT}!`));