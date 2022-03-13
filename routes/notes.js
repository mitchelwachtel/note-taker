const notes = require("express").Router();
const fs = require("fs");
const {addNote, deleteNote} = require("../helpers/fsFunctions");
const {v4: uuidv4} = require("uuid");

// GET Route for retrieving notes info
notes.get("/", (req, res) => {
  // Pass through db.json and send it!
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
  // Date.now() is milliseconds since 1970, so that's pretty unique
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  addNote(newNote);

  fs.readFile("./db/db.json", "utf8", (err, notes) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(notes));
    }
  });
});

notes.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  deleteNote(id);

  fs.readFile("./db/db.json", "utf8", (err, notes) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(notes));
    }
  });
});

module.exports = notes;
