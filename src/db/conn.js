const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose
      .connect(uri).then(()=>console.log("Database successfully connected"))
      .catch((error) => console.log(error));

    const connection = mongoose.connection;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = connectDB;