const express = require("express");
const app = express();
const mongodb = require("./db/db.js");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// Middleware to parse incoming requests with JSON payloads to req.body INDISPENSABLE
app.use(bodyParser.json());

app.use("/", require("./routes/index.js"));

// Connect to MongoDB
mongodb.intDb((err) => {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  } else {
    console.log("Connected to MongoDB");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
