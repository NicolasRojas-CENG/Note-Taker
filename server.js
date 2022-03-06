//Importing Express.js
const express = require("express");
//Importing the database.
const db = require("./db/db.json");
//Importing path module.
const path = require('path');
//Importing file system module.
const fs = require('fs');
//Setting the port to be used.
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/notes.html')));

app.route('/api/notes')
.get((req, res) => showTasks(res))
.post((req, res) =>  saveTask(req.body, res));

app.delete('/api/notes/:id', (req, res) => removeTask(req.params.id, res));

app.get('/*/', (req, res) => res.redirect('/index.html'))

//Function used to show the saved tasks.
const showTasks = (res) => {
   const data = readFromFile();
    res.send(data);
}

//Function used to save a task.
const saveTask = (body, res) => {
   const data = readFromFile();
   data.push(body);
   writeToFile(data, res);
}

//Function used to remove a task.
const removeTask = (id, res) => {
    const data = readFromFile();
    const newData = data.filter(function callback(item){
        if(item.id != id){
            return true
        } else {
            return false
        }
    });
    writeToFile(newData, res);
}

//Function used to get the saved tasks from the "database".
const readFromFile = () => {
    let data = fs.readFileSync('./db/db.json', 'utf-8');
    return data = JSON.parse(data);
    //(write ? writeToFile(data, body, res): res.send(data));
}

//Function to save the list of tasks to the "database".
const writeToFile = (data, res) => {
    //data.push(body);
    data = addId(data);
    data = JSON.stringify(data);
    fs.writeFile("./db/db.json", data, function (err) {
        (err ? res.send('Something went wrong!') : res.send('Task was successfully saved!'));
    });
}

//Function used to add IDs to the tasks.
const addId = (data) => {
    var id = 1;
    //console.log(data);
    data.forEach(element => {
        element["id"] = id++;
    });
    return data;
}

app.listen(PORT, () => console.log(`API server now on port ${PORT}!`));
