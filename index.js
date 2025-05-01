const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const storeRoutes = require("./src/routes/store.route");
const userRoutes = require("./src/routes/user.route");
const itemRoutes = require("./src/routes/item.route");
const transactionRoutes = require("./src/routes/transaction.route");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // untuk enable cors
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data

// Routes
app.use("/store", storeRoutes);
app.use("/user", userRoutes);
app.use("/item", itemRoutes);
app.use("/transaction", transactionRoutes);





// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});