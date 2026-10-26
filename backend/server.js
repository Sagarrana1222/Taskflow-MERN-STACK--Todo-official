
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Register API
app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});


app.get("/", (req,res)=>{
    res.send("MERN Todo Backend Running");
});


const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});