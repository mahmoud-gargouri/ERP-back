const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const checkRole = require("./middleware/checkRole");
const isAuth = require("./middleware/is-auth");

// Importez vos routes

const eventRoutes = require("./routes/event");
const machineRoutes = require("./routes/machine");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const societeRoutes = require("./routes/societe");
const supplierRoutes = require("./routes/supplier");

const URL =
  "mongodb+srv://mahmoud:Mah123Mon123Gar@cluster0.mzfoe0n.mongodb.net/calendar";
const corsOptions = {
  origin: "http://localhost:5000", // Adresse de votre frontend
  credentials: true, // Permet d'envoyer des cookies
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

//set Header

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Utilisez vos routes

app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(eventRoutes);
app.use(societeRoutes);
app.use(supplierRoutes);
app.use(isAuth, checkRole(["admin", "magasinier"]), machineRoutes);

//Errors

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//Connection to DB

mongoose
  .connect(URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });

//Port Number

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
