import mongoose from "mongoose";

//connect to database
const connectBD = async (url) => {
  try {
    return mongoose
      .connect(url)
      .then(() => {
        console.log("Connected to database successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export default connectBD;
