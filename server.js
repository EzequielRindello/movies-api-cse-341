const express = require("express");
const app = express();
const mongodb = require("./db/db.js");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const createError = require("http-errors");

// Middleware to parse incoming requests with JSON payloads to req.body INDISPENSABLE
app.use(bodyParser.json());

// swagger docs route for the app
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// route for the app
app.use("/", require("./routes/index.js"));

// Error handler middleware (must be at the end of all routes)
app.use((err, req, res, next) => {
  // If the error is not a HTTP error, we create one
  if (!err.status) {
    err = createError(500, err.message || "Internal Server Error");
  }
  // Send the response
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send(message);
});

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
