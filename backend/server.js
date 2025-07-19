const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/mongodb");

//env config
dotenv.config();

//MONGODB CONNECTION
connectDB();

// rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
// app.use("/api/v1/todo", require("./routes/todoRoute"));
app.use("/api/v1/test", require("./routes/testRoutes"));


//port
const PORT = process.env.MONGO_DB_URL || 2025

// //listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running on ${process.env.DEV_MODE} mode on Port no ${PORT}`
   
  );
});