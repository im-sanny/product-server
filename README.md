# Backend - Product Management

## Overview

This is the backend part of the Product Management project, built using Node.js, Express.js, and MongoDB. The backend provides APIs for managing products and user authentication.

## Features

- **Product APIs**: CRUD operations, searching, filtering, and pagination.
- **User Authentication**: Google and Email/Password authentication using Firebase.
- **Dummy Data**: Inserts at least 40 products into the database for testing.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/im-sanny/producthub-server
    cd backend-repo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    MONGO_URI=mongodb://localhost:9000/products
    FIREBASE_API_KEY=your-firebase-api-key
    FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    FIREBASE_PROJECT_ID=your-firebase-project-id
    FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    FIREBASE_APP_ID=your-firebase-app-id
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. The server will be running at `http://localhost:9000`.

### API Endpoints

- **GET /api/products**: Fetches all products with pagination.
- **GET /api/products/:id**: Fetches a product by ID.
- **POST /api/products**: Adds a new product (for initial setup).
- **PUT /api/products/:id**: Updates a product by ID.
- **DELETE /api/products/:id**: Deletes a product by ID.

## Dummy Data

To insert dummy data into the database, use the `/api/products` endpoint with a POST request containing product details.

## Contribution

1. Fork the repository and clone your fork.
2. Create a new branch for your changes.
3. Make changes and commit them with descriptive messages.
4. Push your changes and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [raselparvezsanny@gmail](mailto:raselparvezsanny@gmail).
