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
1. **Users**
   - Fields: `id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`
2. **Movies**
   - Fields: `id`, `title`, `genre`, `releaseDate`, `director`, `description`, `averageRating`, `createdAt`, `updatedAt`
3. **Comments**
   - Fields: `id`, `userId`, `movieId`, `commentText`, `rating`, `createdAt`, `updatedAt`

## Features

### API Endpoints
#### Users
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user with OAuth.
- `GET /users/:id`: Get user info.
- `PUT /users/:id`: Update user info.
- `DELETE /users/:id`: Delete a user.

#### Movies
- `GET /movies`: Get all movies.
- `POST /movies`: Add a new movie (Admin only).
- `PUT /movies/:id`: Update movie info (Admin only).
- `DELETE /movies/:id`: Remove a movie (Admin only).

#### Comments
- `GET /movies/:id/comments`: Get all comments for a movie.
- `POST /movies/:id/comments`: Add a comment to a movie.
- `PUT /comments/:id`: Update a comment.
- `DELETE /comments/:id`: Remove a comment.

### Authentication
- Use **OAuth** for secure user login.

### Validation and Error Handling
- Validate input data.
- Return helpful error messages with correct HTTP status codes.

## Deployment
- Deployed on **Render** and accessible via an external URL.

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
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   OAUTH_CLIENT_ID=your-client-id
   OAUTH_CLIENT_SECRET=your-client-secret
   PORT=3000
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Deployment
- Follow [Render's guide](https://render.com/docs/deploy-nodejs) to deploy your app.

## Contributing
Contributions are welcome! Fork the repo and submit a pull request.

## License
Licensed under the MIT License.
