const express = require("express");
require("./config/mongoose.config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const CPORT = process.env.CPORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${CPORT}`,
  })
);
app.use(cookieParser());

require("./routes/movie.routes")(app);
const userRoutes = require("./routes/user.routes");
userRoutes(app);

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
