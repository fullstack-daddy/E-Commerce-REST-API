import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectBD from "./config/database.js";

const app = express();

app.use(cors);
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const startServer = async (req, res) => {
  try {
    const PORT = process.env.PORT || 6000;
    const DB_URL = process.env.DB_URL;

    await connectBD(DB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

startServer();
