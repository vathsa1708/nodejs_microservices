

## Introduction

This project consists of two main components: the Main Service and the Public API Microservice. The Main Service handles user authentication and authorization using JWT, while the Public API Microservice provides a public API that does not require authentication with email and password but instead uses an API key.

## Architecture Overview

### Main Service:

The Main Service is responsible for user authentication using JWT. It provides the following endpoints:

1. **POST /api/register:** Registers a new user.
2. **POST /api/login:** Logs in an existing user and generates a JWT token.
3. **POST /api/protected:** Requires authentication with a valid JWT token.
4. **POST /api/candidate:** Adds candidate details with user api_key.
5. **GET /api/candidate:** Retrieves all candidates added by user.
6. **POST /api/user:** Fetches details of user based on user api_key.

### Public Service:

The Public API Microservice provides a public API that does not require authentication with email and password but whose endpoints are authorized with an API key. It includes the following endpoints:

1. **POST /api/public/profile:** Retrieves the profile information of the user corresponding to the API key used.
2. **GET /api/public/candidate:** Retrieves all candidates associated with the user whose API key is being used.

## Database Schema

The database consists of two main collections:

1. **users:** Stores user information including first name, last name, email, and password hash.
2. **candidates:** Stores candidate information including first name, last name, email, and user ID.

## Authentication

Authentication is performed using JWT (JSON Web Tokens). Users must register and log in to obtain a JWT token, which is then used to access protected endpoints.

## Installation

Navigate to the `main_service` folder and run the following commands:


     cd main_service
     npm install
     node server.js

 Navigate to the 'public-api' folder and run the following commands:
  
    cd public-api
    npm install
    node server.js
## Security

MONGO_URI is provided in .env files of both folders and made secure but it is accessible in every device 


