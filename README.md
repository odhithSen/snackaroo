# Snackaroo - Restaurant Management Application

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Error Handling and Validation](#error-handling-and-validation)
8. [Project Structure](#project-structure)
9. [Conclusion](#conclusion)
10. [License](#license)

## Project Overview

This is a full-stack restaurant management system that allows customers to make food orders to partner restaurants. It's implemented using **React.js** for the frontend, **Node.js** for the backend, and **MySQL** as the database. The app allows restaurant admins to manage restaurant menus, orders, and reports through a RESTful APIs. It supports features like JWT-based authentication, user management, order placement, reporting, and more.

## Features

- **User Authentication**: Users can sign up, log in, and log out using JWT-based authentication.
- **Restaurant Management**: Restaurant admins can manage restaurant menu items.
- **Order Management**: Users can place orders, view order history, and track order status.
- **User Management**: Admins can manage Restaurants, view Restaurant details, and manage users.
- **Reporting**: Restaurant admins can view order reports, sales reports, and other analytics.

## Technologies Used

### Frontend:

- **React.js**: User interface development.
- **Shadcn**: For UI components.
- **Tailwind CSS**: For styling.
- **Auth0**: For user authentication.
- **Redux Toolkit**: For state management.
- **Axios**: For making API requests.
- **React Router**: For navigation and route protection.
  \
  \
  [![Frontend](https://skillicons.dev/icons?i=ts,react,tailwind,redux)](/)

### Backend:

- **Node.js**: Backend framework.
- **Express.js**: Used for building the RESTful API.
- **Sequelize**: ORM for interacting with the MySQL database.
- **JWT**: JSON Web Token for user authentication.
- **AJV**: For request body validation.
  \
  \
  [![Backend](https://skillicons.dev/icons?i=nodejs,express,ts,sequelize)](/)

### Database:

- **MySQL**: Relational database used to store user, restaurant, menu, and order information.
  \
  \
  [![Database](https://skillicons.dev/icons?i=mysql)](/)

## Setup Instructions

### Prerequisites:

- Node.js (v14+)
- MySQL (v8+) / Docker desktop
- Git
- Auth0 application setup - [Configure Auth0](https://auth0.com/docs/quickstart/spa/react/01-login)

### Cloning the repository

1. Clone the repository:
   ```bash
   git clone https://github.com/odhithSen/snackaroo.git
   ```

### Development Database Setup

You can either use a local MySQL database or start the configured mysql Docker image using `docker compose`. Here are the steps to set up a MySQL database using Docker:

1. Create a `.env` file in the root directory (Check .env.example) and add the following environment variables:
   ```bash
    MYSQL_ROOT_PASSWORD
    MYSQL_DATABASE
    MYSQL_USER
    MYSQL_PASSWORD
   ```
2. Start the MySQL Docker container:
   ```bash
    docker compose up
   ```

### Mono-repository Setup

This project uses a mono-repository setup with a shared `node_modules` folder for the frontend and backend. To set up the mono-repository, follow these steps:

1. Configure npm workspace:
   ```bash
   npm install
   ```

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory (Check .env.example) and add the following environment variables:
   ```bash
    PORT
    DB_HOST
    DB_USER
    DB_PASS
    DB_NAME
    DB_PORT
    AUTH0_AUDIENCE
    AUTH0_DOMAIN
   ```
4. Run database migrations and seed data
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend directory (Check .env.example) and add the following environment variables:
   ```bash
    REACT_APP_AUTH0_DOMAIN
    REACT_APP_AUTH0_CLIENT_ID
    REACT_APP_AUTH0_CALLBACK_URL
    REACT_APP_API_AUTH0_AUDIENCE
    REACT_APP_BACKEND_URL
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Database Schema

Database diagrams and DB schema definitions can be found in the [DB schema](https://dbdiagram.io/d/snackaroo-6700e56afb079c7ebd6acac7) file.

## API Documentation

Api documentation generated using Postman and can be accessed by [API documentation](https://documenter.getpostman.com/view/20091662/2sAXxTapib) file.

## Error Handling and Validation

- **AJV**: Used for request body validation to ensure proper input.

## project-structure

```bash
/frontend
    /public
    /src
        /assets
        /components
        /hooks
        /models
        /pages
        /services
        /slices
        /utils
    /.env

/backend
    /config
    /migrations
    /seeders
    /src
        /controllers
        /enums
        /middlewares
        /models
        /routes
        /services
        /utils
    /.env

/LICENSE.txt
/README.md
/docker-compose.yml
/.env
```

## Conclusion

This project implements a full-featured restaurant management system with essential features for user authentication, menu management, order management, and reporting. It adheres to best practices in full-stack development, ensuring security, and performance.

## License

Please review the [license](LICENSE.txt) file for more information.
