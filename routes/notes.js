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
  // replaced Date.now() with uuidv4()
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  // addNote() is a function from the jsFunctions file.
  // It adds our new note to the array of objects from db.json and then resaves that array to the server.
  addNote(newNote);

  // Here we return the contents of db.json to be displayed after the note has been added
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

// deleteNote() is a function from the fsFunctions file. 
// It iterates through the saved array of objects until it gets to the one with the same id and removes it.
// Then it resaves the array to the server
  deleteNote(id);

  // Here we return the contents of db.json to be displayed after the note has been removed
  fs.readFile("./db/db.json", "utf8", (err, notes) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(notes));
    }
  });
});

module.exports = notes;
