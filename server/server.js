const express = require("express");
const connectDB = require("./database/db");
const authRoutes = require("./routes/authUser");
const app = express();
app.use(express.json()); 
connectDB();
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Connected to port ${port}`));