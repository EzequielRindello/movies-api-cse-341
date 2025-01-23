const express = require("express");
const app = express();
const mongodb = require("./db/db.js");

const port = process.env.PORT || 3000;

app.use("/", require("./routes/index.js"));

mongodb.intDb((err) => {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  } else {
    console.log("Connected to MongoDB");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
