require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");
const LogoRoutes = require("./routes/LogoRoutes");
const { connectDB } = require("./config/db");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
 

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());


app.use("/uploads", express.static("uploads"));

// User Login
app.use("/api/user",  UserRoutes);

// Logo upload
app.use("/api/post", LogoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`) || 4000);

// add this code
app.get('/', (req, res) => {
    res.send('API is running...');
  });
