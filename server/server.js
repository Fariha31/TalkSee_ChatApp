const express = require("express");
const connectDB = require("./database/db");
const authRoutes = require("./routes/authUser");
const authContact = require("./routes/authContact");
const authFriend= require("./routes/authFriend");
const cors = require("cors");
const app = express();
app.use(express.json()); 
connectDB();
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/contact",authContact)
app.use("/api/friend", authFriend);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Connected to port ${port}`));