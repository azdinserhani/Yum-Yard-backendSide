# YumYard Backend-Side

YumYard is a dynamic web application designed to help users discover, manage, and share recipes. This repository contains the backend-side code for YumYard.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **Recipe Management:** Handle CRUD operations for recipes.
- **User Authentication:** Manage user login, registration, and profile.
- **API Endpoints:** Provide various endpoints for the frontend to interact with.
- **Database Management:** Manage recipe and user data in a PostgreSQL database.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/azdinserhani/Yum-Yard-backendSide.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Yum-Yard-backendSide
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   DATABASE_URL=your_database_url_here
   JWT_SECRET=your_jwt_secret_here
   ```
5. Run the database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
6. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. The server will be running at `http://localhost:5000`.
2. You can use tools like Postman to test the API endpoints.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for Node.js.
- **PostgreSQL:** Relational database system.
- **JWT:** For user authentication.
- **dotenv:** For managing environment variables.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## Contact

If you have any questions or suggestions, feel free to contact me:

- **Name:** Serhani Az-eddine
- **Email:** azdineserhani1@gmail.com

---

Thank you for contributing to YumYard! We hope it enhances your cooking experience.
```
