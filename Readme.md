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
- Add plans the customer using Update Plan Button on top of the admin home page
- Upload Videos to the C Stream through Upload Video Button
- Register a Customer
- Now you can watch the movies uploaded by the Admin for your plan and also you can add movies to your Favourites List.

## Preview

Check out the preview of the C Stream (CODIIS Stream) application by following this link: [C Stream (CODIIS Stream) Preview]()

This video provides a visual walkthrough of the application, showcasing its features and user interface. Download & Watch the preview to get a glimpse of what C Stream (CODIIS Stream) has to offer.

## Technologies Used

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

These technologies were chosen to create a robust, efficient server for c stream application
