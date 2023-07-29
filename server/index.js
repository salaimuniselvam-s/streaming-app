const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const port = process.env.PORT || 3002;
const connectionUrl =
  process.env.MONGODB_URL || "mongodb://localhost:27017/c-stream";

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Welcome to C Stream Server..");
});

app.use("/", authRoutes, adminRoutes);

console.log("Connecting To MongoDb...");

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Starting Server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
