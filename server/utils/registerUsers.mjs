import fetch from "node-fetch";
import { BASE_URL } from "./utils.js";

const credentials = [
  {
    username: "codiis",
    password: "codiis123",
    confirmPassword: "codiis123",
    role: "admin",
  },
  {
    username: "salai muni selvam",
    password: "salai123",
    confirmPassword: "salai123",
    role: "customer",
  },
  {
    username: "vignesh",
    password: "vignesh123",
    confirmPassword: "vignesh123",
    role: "customer",
  },
  {
    username: "ramesh",
    password: "ramesh123",
    confirmPassword: "ramesh123",
    role: "customer",
  },
  {
    username: "suresh",
    password: "suresh123",
    confirmPassword: "suresh123",
    role: "customer",
  },
];

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
// registering admin
async function registerUsers() {
  credentials.forEach((user) => {
    if (user.role == "admin") {
      fetch(`${BASE_URL}/register-admin`, {
        ...requestOptions,
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response data:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
}

(function main() {
  registerUsers();
})();
