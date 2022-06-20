const express = require("express");
require("./config/mongoose.config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const socket = require("socket.io");
const Movie = require("./models/movie.model");
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

const server = app.listen(PORT, () =>
  console.log(`Listening on Port: ${PORT}`)
);

const io = socket(server, {
  cors: {
    origin: `http://localhost:${CPORT}`,
    allowedHeader: ["*"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("clientDeletedMovie", (payload) => {
    Movie.deleteOne({ _id: payload })
      .then((deleteMovie) => {
        Movie.find({})
          .populate("createdBy", "userName firstName lastName email")
          .sort({ releaseDate: 1 })
          .then((movies) => {
            io.emit("movieDeleted", movies);
          });
      })
      .catch((err) => {
        io.emit("movieDeleted Error: ", { err });
      });
  });
  socket.on("disconnect", (socket) => {
    console.log(`USER ${socket.id} disconnected`);
  });
});
