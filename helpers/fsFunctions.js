const fs = require("fs");



const fileIt = (parsedNotes) => {
  fs.writeFile(
  "./db/db.json",
  JSON.stringify(parsedNotes, null, 4),
  (writeErr) =>
    writeErr
      ? console.error(writeErr)
      : console.info("Successfully updated Notes!")
);
}

const addNote = (newNote) => {
  // Pull out previous notes
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Add a new note to array
      parsedNotes.push(newNote);

      // Put array of notes back in file on server
      fileIt(parsedNotes);
    }
  });
};

const deleteNote = (id) => {
    // Pull out previous notes 
    fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Pass through the notes. If the ids match with the one that was clicked on, then remove it from the array!
      for (let i = 0; i < parsedNotes.length; i++) {
        if (id == parsedNotes[i].id) {
          parsedNotes.splice(i, 1);
        }
      }

      // Put array of notes back in file on server
      fileIt(parsedNotes);
    }
  });
};

module.exports = {addNote, deleteNote};
