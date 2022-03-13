const notes = require("express").Router();
const fs = require("fs");
const addNote = require('../helpers/fsFunctions');

// GET Route for retrieving notes info
notes.get("/", (req, res) => {
  // TODO: pass through db.json and send it!
  fs.readFile("./db/db.json", "utf8", (err, notes) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(notes));
    }
  });
});

notes.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

  // Variable for the object we will save
  const newNote = {
    title,
    text,
    id: Date.now(),
  };

  addNote(newNote);
  // send the file of notes to public/js/index.js
  fs.readFile("./db/db.json", "utf8", (err, notes) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(notes));
    }
  });
});

module.exports = notes;
