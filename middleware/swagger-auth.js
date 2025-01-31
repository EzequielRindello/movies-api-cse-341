const createError = require("http-errors");

const isAuthenticatedSwagger = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(400).json({
      error: "Unauthorized",
      message: "You don't have permission to access this resource.",
    });
  }
  next();
};

module.exports = { isAuthenticatedSwagger };

