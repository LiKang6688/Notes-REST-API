// The index.js file only imports the actual application from the app.js file
// and then starts the application.
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

mongoose.set("useFindAndModify", false);

// establishing the connection to the database
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// the notesRouter that is attached to the /api/notes route.
app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
