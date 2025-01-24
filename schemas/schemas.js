const Joi = require("@hapi/joi");

const movieSchema = Joi.object({
  title: Joi.string().min(1).max(45).required(),
  genre: Joi.string().min(1).max(45).required(),
  releaseDate: Joi.string().isoDate().required(),
  director: Joi.string().min(1).max(45).required(),
  description: Joi.string().min(1).max(255).required(),
  averageRating: Joi.number().min(0).max(10).required(),
  createdAt: Joi.string().isoDate().required(),
  updatedAt: Joi.string().isoDate().required(),
}).options({ stripUnknown: true });

const reviewSchema = Joi.object({
  movieId: Joi.string()
    .regex(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "El movieId debe ser un ObjectId válido.",
    }),
  IMDbReview: Joi.string().min(1).max(255).required(),
  RottenTomatoesReview: Joi.string().min(1).max(255).required(),
  MetacriticReview: Joi.string().min(1).max(255).required(),
  LetterboxdReview: Joi.string().min(1).max(255).required(),
}).options({ stripUnknown: true });

module.exports = { movieSchema, reviewSchema };
