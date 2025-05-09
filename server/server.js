require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");
const { connectDB } = require("./config/db");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
 
// Apply CORS middleware with options

app.use(cors());
app.use(express.json());

// User Login
app.use("/api/user",  UserRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`) || 4000);

// add this code
app.get('/', (req, res) => {
    res.send('API is running...');
  });
