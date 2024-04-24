const mongoose = require("mongoose");

const DB_CONNECTION = async () => {
  const DB_STRING = await mongoose
    .connect(process.env.DB_CONNECT)
    .then(console.log("connected done to DB"))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = DB_CONNECTION;
