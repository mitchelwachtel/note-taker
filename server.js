const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

const app = express();

// MIDDLEWEAR
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// '/api' is sent to the index.js in the routes folder 
app.use("/api", api);

app.use(express.static("public"));

// GET Route for Landing Page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for Notes Page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET * should return the index.html file.
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
