const express = require("express");
const app = express();
const mongodb = require("./db/db.js");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const createError = require("http-errors");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

// Middleware to parse incoming requests with JSON payloads to req.body INDISPENSABLE
app.use(bodyParser.json());

// Configure session middleware with Passport.js integration
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false, 
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware to configure CORS headers for the application
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
});
app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors({ origin: "*" }));
// route for the app
app.use("/", require("./routes/index.js"));

// Configure GitHub strategy for Passport.js
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});


// Middleware to handle authentication with GitHub
app.get("/", (req, res) => {
  res.send(
    req.session.user
      ? `Logged in as ${req.session.user.username}`
      : "logged out"
  );
});


// Middleware to handle authentication with GitHub
app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs" }),
  (req, res) => {
    console.log("User authenticated:", req.user);
    if (!req.user) {
      return res.status(500).send("Authentication failed");
    }
    req.session.user = req.user;
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
      }
      res.redirect("/");
    });
  }
);


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
