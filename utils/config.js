// The handling of environment variables is extracted into a separate utils/config.js file

const logger = require("./logger");

const PORT = process.env.PORT || 3001;

if (process.argv.length < 3) {
  logger.error(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const MONGODB_URI = `mongodb+srv://likang:${password}@cluster0.dptdk.mongodb.net/note-app?retryWrites=true&w=majority`;

module.exports = {
  MONGODB_URI,
  PORT,
};
