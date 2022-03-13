const fs = require('fs');

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

      // Put array of notes back in file
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
}


module.exports = addNote;