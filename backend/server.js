const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/mongodb");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Dynamic CORS for all *.vercel.app and localhost
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||                            
        origin.includes("localhost") ||        
        /\.vercel\.app$/.test(origin)         
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/todo", require("./routes/todoRoutes")); 

// Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.DEV_MODE} mode on port ${PORT}`);
});
