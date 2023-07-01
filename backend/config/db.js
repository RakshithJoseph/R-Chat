const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://RakshithJ:rchat_2002@rchat.lndqofz.mongodb.net/?retryWrites=true&w=majority",
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
