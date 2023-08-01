# C Stream (CODIIS Stream)

## Introduction

C Stream (CODIIS Stream) is a streaming application Which allows users to enjoy their screen time by providing a platform to watch and purchase videos based on different plans. The application is designed with two types of users: Admin and Customer.

## Project Overview

The project is developed using the following technologies:

- Front End: React JS
- Back End: Node JS
- Database: MongoDB
- Pattern: Model View Controller (MVC)

## Prerequisites

Before running the C Stream (CODIIS Stream) application, ensure that you have the following prerequisites installed on your system:

- Node.js (version 14 or above)
- npm (Node Package Manager) or yarn

## Getting Started

To start the C Stream (CODIIS Stream) server and run the application, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/salaimuniselvam-s/streaming-app.git
```

2. Navigate to the project directory:

```bash
cd streaming-app
```

### Start the Nodejs Server

1. Navigate to the server directory:

```bash
cd server
```

2. Install the dependencies:

```bash
npm install
```

3. Setting Up the Environment Variables:

```bash
cp .env.example .env
```

Add the required mongodb connection url and other fields respectively.

4. Start the development server:

```bash
npm run start
```

5. Open your browser and visit http://localhost:3002 to validate the C Stream (CODIIS Stream) server. It Should return "Welcome to C Stream Server.."

#### C Stream Server End Point Details

All the below routes have to be prefixed with BASE_URL in the .env file (By default server will be running on http://localhost:3002)

##### **Authentication**

-**POST /login** - Handles user login, providing access and refresh tokens upon successful authentication.

-**POST /register-admin** - Allows registering new administrators with special privileges.

-**POST /register-customer** - Allows registering new customers for regular user accounts.

-**POST /refreshToken** - Refreshes access tokens by providing a new one based on a valid refresh token.

-**DELETE /logout** - Invalidates the provided refresh token, logging the user out of the system.

##### **Common Routes**

-**GET /admin/get-all-plans** - Retrieves all subscription plans available in the system for customers, which is used in customer registration.

Admin and Customer Routes are Protected by Jwt Tokens.

##### **Admin Routes**

-**POST /admin/upload-video** - Allows administrators to upload a new video.

-**GET /admin/get-all-videos** - Retrieves all videos available in the system for administrators.

-**DELETE /admin/delete-movie/:id** - Deletes a specific movie by its ID from the system for administrators.

-**POST /admin/add-new-plans** - Allows administrators to add new subscription plans for users.

-**PUT /admin/update-movie-plans/:id** - Updates subscription plans for a specific movie by its ID for administrators.

-**DELETE /admin/remove-plan/:id** - Removes a subscription plan by its ID from the system for administrators.

##### **Customer Routes**

-**GET /customer/get-all-videos** - Retrieves all videos available in the system for authenticated customers based on their subscription plan.

-**POST /customer/add-to-favourite-movie/:movieId** - Adds a specific movie to the customer's list of favorite movies.

-**DELETE /customer/remove-from-favourite-movie/:movieId** - Removes a specific movie from the customer's list of favorite movies.

-**GET /customer/favourite-movies** - Retrieves the list of favorite movies for the customer.

-**GET /customer/:username/get-all-friends** - Retrieves all friends of the customer based on their username.

-**POST /customer/:username/add-friends** - Adds a friend to the customer's friend list based on the friend's username.

-**DELETE /customer/:username/delete-friend/:friendId** - Removes a friend from the customer's friend list based on the friend's ID.

-**GET /customer/get-all-customers** - Retrieves all customer users available in the system.

### Start the C Stream Client Application

1. Navigate to the client directory:

```bash
cd client
```

2. Install the dependencies:

```bash
npm install
```

3. Setting Up the Environment Variables:

```bash
cp .env.example .env
```

Add the C stream server url.

4. Start the development server:

```bash
npm run start
```

5. Open your browser and visit http://127.0.0.1:5173/ to view C Stream Client Application

## Application Flow

- Register an admin
- Add plans to the customer using Update Plan Button on top of the admin home page
- Upload Videos to the C Stream through Upload Video Button
- Register a Customer
- Now you can watch the movies uploaded by the Admin for your plan and also you can add movies to your Favourites List & You can Create a Friend Group.

## C Stream Application Deployment Details

The C Stream Application is a streaming app that allows users to access and watch videos. It consists of a frontend client-app deployed on Vercel, a backend server deployed on Render, and the MongoDB database hosted on MongoDB Atlas.

- Client-App - https://streaming-app-swart-one.vercel.app/
- Server - https://streaming-app-server-otce.onrender.com/
- MongoDB - https://cloud.mongodb.com/

### Customer Crendentials

| Username          | Password   | Role     |
| ----------------- | ---------- | -------- |
| salai muni selvam | salai123   | customer |
| ramesh            | ramesh123  | customer |
| suresh            | suresh123  | customer |
| vignesh           | vignesh123 | customer |

## Preview

Check out the preview of the C Stream (CODIIS Stream) application by following this link: [C Stream (CODIIS Stream) Preview](https://drive.google.com/file/d/1yxMKD5AedeNnuj5Qq_1pQ2cbfuX4YX_5/view?usp=sharing)

This video provides a visual walkthrough of the application, showcasing its features and user interface. Download & Watch the preview to get a glimpse of what C Stream (CODIIS Stream) has to offer.

<!-- ## Packages Used

### C Stream Client Application

C Stream Client Application is built using the following technologies:

- **React.js**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically-typed superset of JavaScript that provides enhanced tooling and type safety.
- **Vite**: A fast build tool for modern web applications.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and customizable UI components.
- **React Query**: A data-fetching and state management library for React applications, optimizing network requests and enhancing performance.
- **React Hook Form**: A library for building forms in React with simple APIs and form validation support.
- **js-cookie**: A JavaScript library for handling cookies in the browser, simplifying cookie manipulation in web applications.
- **Ant Design (antd)**: A popular UI library for React that provides a set of customizable and accessible components.
- **Framer Motion**: A library for creating smooth and fluid animations in React applications.
- **React Router Dom**: A library for routing in React applications, allowing for navigation and URL handling.
- **React Icons**: A library that provides a wide range of icons for use in React applications.
- **React-youtube**: A React component that provides an easy way to embed and interact with YouTube videos in React applications.
- **Axios**: A promise-based HTTP client for making API requests in JavaScript and TypeScript.

These technologies were chosen to create a robust, efficient, and visually appealing web application with a focus on responsive design and a smooth user experience.

### C Stream Server

C Stream Server is built using the following technologies:

- **bcrypt**: A library for hashing passwords securely, enhancing user authentication.
- **body-parser**: Middleware for parsing incoming request bodies in Express applications.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- **dotenv**: A module for loading environment variables from a .env file into Node.js applications.
- **express**: A fast and minimalist web framework for Node.js, simplifying server-side development.
- **helmet**: A security middleware that helps protect Express applications from various web vulnerabilities.
- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWT) for authentication purposes.
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB, simplifying database interactions in Node.js applications.
- **morgan**: Middleware for logging HTTP request details in Express applications.
- **node-fetch**: It's a lightweight library that brings the fetch function to Node.js environments.

These technologies were chosen to create a robust, efficient server for c stream application -->
