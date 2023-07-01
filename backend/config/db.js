const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "*****************",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Mongo connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};
module.exports = connectDB;
