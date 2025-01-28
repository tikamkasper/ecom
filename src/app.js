const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ origin: true, credentials: true }));

// app.use(
//   cors({
//     origin: " http://localhost:5173/", // Your frontend URL
//     credentials: true, // Allow credentials (cookies, headers, etc.)
//   }),
// );

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

const userRouter = require("./routes/userRoutes.js");

//routes declaration
app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register

module.exports = { app };
