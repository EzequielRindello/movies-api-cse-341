# Movie Review Page Project

This project creates a web application for reviewing movies, allowing users to comment on movies. It includes user authentication, an API backend, and a MongoDB database.

## Project Overview

### Key Requirements
- Use **two MongoDB collections**.
- One collection must have **7 or more fields**.
- Connect successfully to **MongoDB**.
- Include fully functional **GET**, **POST**, **PUT**, and **DELETE** API routes.
- Implement **data validation** and **error handling**.
- Use **OAuth** for user authentication.
- Provide **professional API documentation**.
- Deploy the API on **Render** for external access.

### Collections
1. **Movies**
   - Fields: `id`, `title`, `genre`, `releaseDate`, `director`, `description`, `averageRating`, `createdAt`, `updatedAt`
2. **Review**
   - Fields: `id`, `movieId`, `review`

## Features

### API Endpoints
#### Movies
- `GET /movies`: Get all movies.
- `POST /movies`: Add a new movie (Admin only).
- `PUT /movies/:id`: Update movie info (Admin only).
- `DELETE /movies/:id`: Remove a movie (Admin only).

#### Review
- `GET /review/:id/review`: Get all Review for a movie.
- `POST /review/:id/review`: Add a Review to a movie.
- `PUT /review/:id`: Update a Review.
- `DELETE /review/:id`: Remove a Review.

### Authentication
- Use **OAuth** for secure user login.

### Validation and Error Handling
- Validate input data.
- Return helpful error messages with correct HTTP status codes.

## Deployment
- Deployed on **Render** [Visit Movies API](https://movies-api-cse-341.onrender.com/)

## Documentation
 - Use /api-docs to get the API Swagger documentation

## Setup

### Prerequisites
- Install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name.git
   ```
2. Navigate to the project folder:
   ```bash
   cd movie-review
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add a `.env` file with:
   ```env
   MONGO_URI=your-mongodb-uri/your-database
   JWT_SECRET=your-jwt-secret
   OAUTH_CLIENT_ID=your-client-id
   OAUTH_CLIENT_SECRET=your-client-secret
   ```
5. Start the server:
   ```bash
   npm start
   ```
