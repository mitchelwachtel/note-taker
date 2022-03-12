const notes = require("express").Router();
const fs = require("fs");

// GET Route for retrieving notes info
notes.get("/", (req, res) => {
  // TODO: pass through db.json and send it!
  console.info("party");
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

  // Obtain existing reviews
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Add a new review
      parsedNotes.push(newNote);

      // Write updated reviews back to the file
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info("Successfully updated Notes!")
      );
    }
  });
});

module.exports = notes;
