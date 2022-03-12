const notes = require("express").Router();

// GET Route for retrieving notes info
notes.get("/", (req, res) => {
  // TODO: pass through db.json and send it!
  console.info("party");
  res.json("./db/db.json");
});

notes.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

  // Variable for the object we will save
  const newNote = {
    title,
    text,
  };
});

module.exports = notes;
