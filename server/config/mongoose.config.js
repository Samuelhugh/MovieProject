const mongoose = require("mongoose");
require("dotenv").config();
const dbName = process.env.DB_NAME;
const mongoURI = `mongodb://localhost/${dbName}`;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((err) => console.log("ERROR IN DB CONNECTION: ", err));
