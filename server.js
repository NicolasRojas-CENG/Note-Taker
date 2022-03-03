//Importing Express.js
const express = require("express");
//Importhing path module.
const path = require('path');
// const index = require("./public/index.html");

const PORT = process.env.PORT || 3000;

const app = express();

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }

  app.use(express.static('public', options));

//Route for the landing page.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

/*Note:
For the route paths, we can use regular expressions.
- "/abc" => /abc normal
- "/ab?cd" => /acd or /abcd (Zero or more of the character before "?")
- "/ab+cd" => /abcd, /abbcd, abbbcd, etc. (One or more of the character before +)
- "/ab*cd" => (/ab + anything + cd) (* = any character, any number of said character)
- "/*man$/" => /ndhaman, /treman, /xerman, etc. (Anything ending with "man")
*/