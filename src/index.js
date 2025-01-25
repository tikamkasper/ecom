require("dotenv").config({ path: "./.env" });

const connectDB = require("./db/dbConnection.js");
const { app } = require("./app.js");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
